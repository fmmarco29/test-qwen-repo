.PHONY: help install test lint format clean run

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n', $$1, $$2}'

install: ## Install dependencies
	pip install -e ".[dev]"

test: ## Run tests
	pytest tests/ -v --cov=src --cov-report=term-missing

lint: ## Run linters
	ruff check src/ tests/
	mypy src/

format: ## Format code
	black src/ tests/
	ruff check --fix src/ tests/

clean: ## Clean generated files
	rm -rf build/ dist/ *.egg-info/ .mypy_cache/ .pytest_cache/
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true

run: ## Run the project
	python -m src.main
