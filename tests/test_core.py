"""Tests for core module."""

from src.core import Example


def test_greet() -> None:
    """Test the greet method."""
    example = Example("World")
    assert example.greet() == "Hello, World!"


def test_name_attribute() -> None:
    """Test the name attribute."""
    example = Example("Test")
    assert example.name == "Test"
