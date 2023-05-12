#!/bin/bash
if [[ -d "$HOME/.microsoft/usersecrets" ]]
then 
  echo "Dotnet secrets exists skipping initializing"
else
  dotnet user-secrets init --project src/Web \
  && dotnet user-secrets set "ConnectionString:CleanersOpanelDb" "$DATABASE_CONNECTION_STRING" --project src/Web
fi
