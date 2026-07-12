import torch
from torch.utils.data import random_split
from torchvision import datasets

import shutil
from pathlib import Path

split_root = Path("./data/split")
dataset = datasets.ImageFolder(root=Path("./data/wbcs"), transform=None)

# split
train, test, val = random_split(
    dataset,
    [0.80, 0.10, 0.10],
    generator=torch.Generator().manual_seed(321)
)

rename: dict[str, str] = {
    "basophil": "BAS",
    "eosinophil": "EOS",
    "monocyte": "MONO",
    "neutrophil": "NEUT",
}

def copies(subset, dir_name: str) -> None:
    counters = {abbr: 1 for abbr in rename.values()}

    for idx in subset.indices:
        img_path, label = dataset.samples[idx]

        old_class = dataset.classes[label]
        new_class = rename[old_class]

        split_dir = split_root / dir_name / new_class
        split_dir.mkdir(parents=True, exist_ok=True)

        ext = Path(img_path).suffix

        new_filename = f"{new_class}_{counters[new_class]:04d}{ext}"
        counters[new_class] += 1

        shutil.copy2(img_path, split_dir / new_filename)
        
copies(train, 'train')
copies(test, 'test')
copies(val, 'val')

print(f'train: {len(train)} images')
print(f'test: {len(test)} images')
print(f'val: {len(val)} images')