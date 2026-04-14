"""Core module."""


class Example:
    """An example class."""

    def __init__(self, name: str) -> None:
        self.name = name

    def greet(self) -> str:
        """Return a greeting message."""
        return f"Hello, {self.name}!"
