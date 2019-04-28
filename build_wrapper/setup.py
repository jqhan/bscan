from setuptools import setup
setup(
    name='bscan',
    version='0.0.1',
    entry_points={
        'console_scripts': [
            'bscan=bscan:run'
        ]
    }
)
