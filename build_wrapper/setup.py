from setuptools import setup
setup(
    name='bscan',
    version='0.0.1',
    install_requires=[
        'requests',
    ],
    entry_points={
        'console_scripts': [
            'bscan=bscan:run'
        ]
    }
)
