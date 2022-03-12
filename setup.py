from setuptools import setup, find_packages
setup(
    name="twb",
    version="0.2",
    packages=find_packages(),
    install_requires=[
        "numpy",
        "datetime",
        "random",
        "requests",
        "bs4"
    ]
)
