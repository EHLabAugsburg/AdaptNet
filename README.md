# AdaptNet-WebMap

## Instructions

 Here is the step-by-step guide to running a the script to create the map:

**Step 1: Install Python**

If Python is not already installed, you need to install it first. Here are the steps:

* Visit the official Python website: <https://www.python.org/>
* Click on the "Download" button and select the correct version for your operating system (e.g. Windows, macOS or Linux).
* Follow the installation instructions by running the installation file and following the prompts.

**Step 2: Install Poetry**

After installing Python, you need to install Poetry. Here are the steps:

* Open a terminal or command prompt (e.g. Command Prompt on Windows).
* Run the following command to install Poetry:
```
pip install poetry
```
* Wait for the installation to complete.

**Step 3: Run the Script**

To run the script, follow these steps:

* Open a terminal or command prompt.
* Navigate to the directory where the script is located by running the following command:
```
cd /path/to/directory
```
* Replace `/path/to/directory` with the actual path to the directory.
* Run the following command to execute the script after (for arguments, see [Command-Line arguments](#command-line-arguments)):
```
poetry run adaptnet -o 'path/to/store/map.html' -s 'path/to/my/tables.xlsx'
```
* Wait for the script to complete.

That's it! If everything is installed and configured correctly, the script should now run successfully.

## Command-Line arguments

To define the location to store the generated map, use the -o argument. If you don't provide this argument, the resulting map can be found in the directory of the script, named as map.html.

To define the source of your attribute-tables, please provide a system file path with the -s argument. Notice that an excel-format is required (.xls, .xlsx).
