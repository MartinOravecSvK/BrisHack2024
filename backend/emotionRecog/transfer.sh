#!/bin/bash

# Define the output file
ENV_YML="environment.yml"


while IFS= read -r line; do
  # Extract package name, version, and source
  IFS='=' read -r -a parts <<< "$line"
  package_name="${parts[0]}"
  package_version="${parts[1]}"
  
  # Check if the package is from PyPI
  if [[ "${parts[2]}" == "pypi_0"* ]]; then
    # It's a pip package, add to pip section
    echo "    - ${package_name}==${package_version}" >> $ENV_YML
  else
    # It's a Conda package, add to dependencies
    # This part ignores the build string and assumes all non-pip packages are from conda-forge or defaults
    echo "  - ${package_name}=${package_version}" >> $ENV_YML
  fi
done < requirements.txt

echo "Your environment.yml is ready."