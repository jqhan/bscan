from setuptools import setup
setup(
    name='wrap',
    version='0.0.1',
    entry_points={
        'console_scripts': [
            'wrap=wrap:run'
        ]
    }
)