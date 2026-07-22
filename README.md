## Orion
Classify white blood cell with a trained-from-scratch CNN model.

The model total parameters is 6,044,548 parameters, with the best validation accuracy of 99.19%

I created an CNN class from scratch entirely, the model totalled parameters counted to 6.04M (as of `(sum(p.numel() for p in model.parameters()))` output).

Also use ``nn.CrossEntropyLoss`` as Criterion and Adams optimizer (``optim.Adam``) with learning rate (LR/lr) of 0.001

# Quick Start
Go to [orion.phattar4phan.workers.dev](orion.phattar4phan.workers.dev) and then add or drag in an image to process, then click analyze and that's it. Confident score with predicted class.

In case you want to do this locally, you can run:

**Clone**:
```shell
git clone https://github.com/phattar4phan/orion.git
```

**Installation**:oml
- Python installation with pyproject.toml
```shell
uv sync (pyproject.toml) 
pip install . (pyproject.toml)
pip install -r requirements.txt (requirements.txt)
```
- Install node dependecies and run locally
```shell
npm install
npm run dev
npm run build (incase you want to build)
```

## AI Usage
I use AI for designing and creating the landing page. for smoother UI/UX experiences, which I can't do it manually.

## License & Author
Apache 2.0 - [phattar4phan](github.com/phattar4phan) (phattar4phan@gmail.com)

## Dataset
The dataset contains 4 classes, totaling 28,500 images with 7,125 each