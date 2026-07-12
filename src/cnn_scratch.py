from typing import Any

import torch
from torch.utils.data import DataLoader, random_split
from torchvision import datasets
from torchvision.transforms import v2

import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim

import time
from pathlib import Path

from rich.console import Group
from rich.table import Table
from rich.live import Live
from rich.progress import (
    Progress,
    BarColumn,
    TextColumn,
    MofNCompleteColumn,
    TransferSpeedColumn,
    TimeElapsedColumn,
    TimeRemainingColumn,
)

IMG_SIZE = 224 # width * height
DATASET = datasets.ImageFolder(root=Path("./data/wbcs/"), transform=None) # no transform yet
LENGTH = [0.80, 0.10, 0.10]
SEED = torch.Generator().manual_seed(321)
BATCH_SIZE = 6
EPOCHS = 20
Device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
_device_name = torch.cuda.get_device_name(0)
_device_properties = torch.cuda.get_device_properties(0)
_cuda_available = torch.cuda.is_available()

# transform
train_transform = v2.Compose([
    v2.Resize(256),
    v2.RandomResizedCrop(
        size=(IMG_SIZE, IMG_SIZE),
        scale=(0.8,1.0)
    ),
    v2.RandomHorizontalFlip(p=0.5),
    v2.RandomVerticalFlip(p=0.5),
    v2.RandomRotation(degrees=(-15, 15)),
    v2.ColorJitter(
        brightness=0.15,
        contrast=0.15,
        saturation=0.15,
        hue=0.03
    ),
    v2.ToImage(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

test_transform = v2.Compose([
    v2.Resize((IMG_SIZE, IMG_SIZE)),
    v2.ToImage(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

val_transform = test_transform

# datasets
train_dataset = datasets.ImageFolder(root=Path("./data/split/train/"), transform=train_transform)
test_dataset = datasets.ImageFolder(root=Path("./data/split/test/"), transform=test_transform)
val_dataset = datasets.ImageFolder(root=Path("./data/split/val/"), transform=val_transform)

# dataloders
train_dataloader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, pin_memory=True, num_workers=3, persistent_workers=True)
test_dataloader = DataLoader(test_dataset, batch_size=BATCH_SIZE, shuffle=False, pin_memory=True, num_workers=3, persistent_workers=True)
val_dataloader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, pin_memory=True, num_workers=3, persistent_workers=True)

class CNN(nn.Module):
    def __init__(self, num_classes: int):
        super().__init__()

        self.features = nn.Sequential(
            nn.Conv2d(3, 16, kernel_size=3, padding=1),
            nn.BatchNorm2d(16),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2), # 224 to 112

            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2), # 112 to 56

            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2), # 56 to 28
        )

        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))

        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64, 128),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.avgpool(x)
        x = self.classifier(x)
        return x
        
model = CNN(num_classes=4).to(Device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

def make_table(history, epochs):
    table = Table(title="Training Logs")
    
    table.add_column("Epoch", justify="center")
    table.add_column("Loss", justify="center")
    table.add_column("Accuracy", justify="center")
    table.add_column("Valid", justify="center")
    table.add_column("Duration(s)", justify="center")
    
    for h in history:
        table.add_row(
            f"{h['epoch']}/{epochs}",
            f"{h['loss']:.4f}",
            f"{h['acc']:.2f}%",
            f"{h['val_acc']:.2f}%",
            f"{h['duration']:.2f}",
        )
        
    return table

def train_one_epoch(model, dataloader, criterion, optimizer, device, progress, task_id) -> tuple[float | Any]:
    model.train()
    
    running_loss = 0.0
    correct = 0
    total = 0
    
    for images, labels in dataloader:
        images = images.to(device)
        labels = labels.to(device)
        
        optimizer.zero_grad()
        
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item() * images.size(0)
        
        preds = outputs.argmax(dim=1)
        total += labels.size(0)
        correct += (preds == labels).sum().item()
        
        progress.update(
            task_id,
            advance=1,
            loss=loss.item(),
            acc=100 * correct / total,
        )
        
    epoch_loss = running_loss / len(dataloader.dataset)
    epoch_acc = 100 * correct / total
    
    return epoch_loss, epoch_acc

def validate(model, dataloader, criterion, device) -> tuple[float | Any]:
    model.eval()
    
    running_loss = 0.0
    correct = 0
    total = 0
    
    with torch.no_grad():
        for images, labels in dataloader:
            images = images.to(device)
            labels = labels.to(device)
            
            outputs = model(images)
            loss = criterion(outputs, labels)
            
            running_loss += loss.item() * images.size(0)
            
            preds = outputs.argmax(dim=1)
            total += labels.size(0)
            correct += (preds == labels).sum().item()
            
        val_loss = running_loss / len(dataloader.dataset)
        val_acc = 100 * correct / total
        
        return val_loss, val_acc
    
def train(model, train_dataloader, val_dataloader, criterion, optimizer, device, epochs: int, save_path: Path | str):
    history = []
    
    best_val_acc = 0.0
    best_epoch = 0
    
    progress = Progress(
                TextColumn("[bold cyan]Epoch {task.fields[epoch]}"),
        BarColumn(),
        MofNCompleteColumn(),
        TransferSpeedColumn(),
        TimeElapsedColumn(),
        TimeRemainingColumn(),
        TextColumn("Loss: {task.fields[loss]:.4f}"),
        TextColumn("Accuracy: {task.fields[acc]:.2f}%"),
    )
    
    with Live(
        Group(make_table(history, epochs), progress),
        refresh_per_second=10,
    ) as live:
        for epoch in range(epochs):
            task = progress.add_task(
                "",
                total=len(train_dataloader),
                epoch=f'{epoch+1}/{epochs}',
                loss=0.0,
                acc=0.0,
            )
            
            start = time.perf_counter()
            
            train_loss, train_acc = train_one_epoch(
                model, train_dataloader, criterion, optimizer, device, progress, task
            )
            
            val_loss, val_acc = validate(
                model, val_dataloader, criterion, device
            )
            
            duration = time.perf_counter() - start
            
            history.append({
                "epoch": epoch + 1,
                "loss": train_loss,
                "acc": train_acc,
                "val_acc": val_acc,
                "duration": duration,
            })
            
            progress.remove_task(task)
            
            live.update(
                Group(
                    make_table(history, epochs),
                    progress
                )
            )
            
            if val_acc > best_val_acc:
                best_val_acc = val_acc
                best_epoch = epoch + 1
                
                torch.save({
                    "epoch": best_epoch,
                    "model_state_dict": model.state_dict(),
                    "optimizer_state_dict": optimizer.state_dict(),
                    "train_loss": train_loss,
                    "val_loss": val_loss,
                    "val_acc": val_acc,
                }, save_path)
                
    print(f'Best: E:{best_epoch} | Validation Accuracy: {best_val_acc:.2f}')
  
print(f'Device: {Device}')
print(f'Number of Classes: {DATASET.classes}')
print(f'Class [index]: {DATASET.class_to_idx}')
print(f'Started training...')
print(f'Model: {model}')

train(
    model,
    train_dataloader,
    val_dataloader,
    criterion,
    optimizer,
    Device,
    EPOCHS,
    "model.pt"
)