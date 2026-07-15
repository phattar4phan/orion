import torch
from torchvision.transforms import v2

from pathlib import Path
from PIL import Image
from colorama import Fore, init

init(autoreset=True)

test_transform = v2.Compose([
    v2.Resize((224, 224)),
    v2.ToImage(),
    v2.ToDtype(torch.float32, scale=True),
    v2.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

@torch.no_grad()
def _predict_(model, image_path: Path | str, transform, device, classes: list):
    model.eval()
    
    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(device)
    
    output = model(image)
    probability = torch.softmax(output, dim=1)
    pred_idx = probability.argmax(dim=1).item()
    
    return {
        "class": classes[pred_idx],
        "index": pred_idx,
        "confidence": probability[0, pred_idx].item()
    }
    
def test_single(model, image_path: Path | str, transform, device, classes: list) -> dict[str, int | float]:
    result = _predict_(model, image_path, transform, device, classes)
    
    _actual_maps = {
        "BAS": "basophil",
        "EOS": "eosinophil",
        "MONO": "monocyte",
        "NEUT": "neutrophil"
    }
    actual = _actual_maps[Path(image_path).parent.name]
    
    correct = result['class'] == actual
    
    print(f'{Fore.CYAN}Image{Fore.RESET}: {image_path}')
    print(f'{Fore.CYAN}Predict{Fore.RESET}: {result["class"]}')
    print(f'{Fore.CYAN}Actual{Fore.RESET}: {actual}')
    print(f'{Fore.CYAN}Confidence{Fore.RESET}: {result["confidence"]:.2f}')
    print(f'{Fore.CYAN}Correct{Fore.RESET}: {correct}')
    
    return {
        "predicted": result["class"],
        "actual": actual,
        "confidence": result["confidence"],
        "correct": correct,
    }