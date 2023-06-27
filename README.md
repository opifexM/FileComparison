[![Actions Status](https://github.com/opifexM/FileComparison/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/opifexM/FileComparison/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/opifexM/FileComparison/actions/workflows/nodejs.yml/badge.svg)](https://github.com/opifexM/FileComparison/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/2512a54eb032a526707d/maintainability)](https://codeclimate.com/github/opifexM/FileComparison/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2512a54eb032a526707d/test_coverage)](https://codeclimate.com/github/opifexM/FileComparison/test_coverage)

# File Comparison

File Comparison is a robust command-line utility engineered to detect differences between two configuration files. Developed using JavaScript and Node.js, the application supports both JSON and YAML file formats, making it versatile and applicable to a variety of use cases.

## Description

FileComparison analyzes two configuration files and generates a detailed report outlining the differences. This utility leverages the power of the Commander npm package to facilitate the handling of command-line inputs.

The solution employs a set of purpose-built functions to deliver this functionality:

-   `readFileData` reads the input files
-   `getDiffData` parses the data and identifies the differences
-   `getDiffReport` formats and presents the results

The output is customizable, allowing users to select from three distinct report formats: `stylish`, `plain`, and `json`. The `stylish` format is the default, presenting data like a JSON object with nested fields represented through indentation. The `plain` format delivers the results in straightforward sentences, while the `json` format presents the difference report as a JSON object.

## Usage

Use the following command format to execute the utility:

`gendiff [options] <filepath1> <filepath2>`

Options:

-   `-V, --version`: Output the version number
-   `-f, --format [type]`: Specify the output format (options: "stylish", "plain", "json"; default: "stylish")
-   `-h, --help`: Display command help

## Technologies Used

FileComparison is built with a stack of powerful technologies:

-   **JavaScript and Node.js**: The backbone of the application, providing the runtime environment.
-   **Commander.js**: Handles command-line inputs.
-   **Lodash**: Offers a comprehensive set of utility functions to streamline code.
-   **js-yaml**: Parses YAML files.

On the development side, the project utilizes:

-   **Jest**: Facilitates testing of the application.
-   **ESLint**: Ensures adherence to code quality standards.
-   **eslint-config-airbnb-base, eslint-plugin-fp, eslint-plugin-import, eslint-plugin-jest**: Provides additional eslint rules.

## License

FileComparison is licensed under the ISC license.
