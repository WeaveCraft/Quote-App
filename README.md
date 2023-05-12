# Quote-App

## Local Development

---

## **Prerequisites**

- Using [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) with official [dotnet sdk image](https://hub.docker.com/_/microsoft-dotnet-sdk/)

---

## **Quick start**

### **Install**:

- [Docker and docker compose](https://docs.docker.com/engine/install/)
- [Vs code](https://code.visualstudio.com/)
- When the project is open for the first time, click yes to install the recommended extensions from the popup shown in the bottom right corner. Alternative go to extensions page in the _Vs Code_ menu to the left and search and install _Dev Containers_

### **Windows notice**

Windows wants to change the execution file mode on shell files

Run:

```
git config --local include.path ../.gitconfig
```

Which will include the configuration in the root dir.

There is also a `.gitattributes` that will infer line ending styles on different files.

Shell scripts needs `LF` as line ending otherwise they will not work when running from windows os and is inferred by the `.gitattributes` file.

### **ssh-agent**

To be able to interact (git pull, git push etc.) with the git repository from inside the dev container, an ssh-Agent needs to be running.

Following configurations will start the ssh-agent automatically when a terminal window is open.

_Windows_

Open a new PowerShell instance

**Make sure you're running as an Administrator**

```
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
Get-Service ssh-agent
```

_Linux/Mac_

**Note:**
Mac usually has a ssh-agent running

<br />

check if ssh-agent by running this command in a terminal window

```
pgrep ssh-agent
```

Update your shell config e.g. `~/.bashrc`, `~/.zshrc`.

```
if [ -z "$SSH_AUTH_SOCK" ]; then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # Launch a new instance of the agent
        ssh-agent -s &> $HOME/.ssh/ssh-agent
   fi
   eval `cat $HOME/.ssh/ssh-agent`
fi
```

Open a new terminal window or run

```
source ~/.<shell file> // replace shell file with which ever shell your using e.g bashrc or zshrc
```

<br />

### **Starting Dev Container**

When the project is open with the Dev Containers extension installed, Click the popup button `Reopen in Container` in the right bottom corner.

Alternative open Command Palette `Ctrl+Shift+P` and run the command `Dev Containers: Rebuild and Reopen in Container` or `Dev Containers: Reopen in Container` where the first command will rebuild the entire container.

Initial, this will take some time to build the container. A button will show up in the bottom right corner which you can click to show the build process in the terminal window.

When the container have been built and starting up, the dotnet project will start automatically.

The backend can be reached on [https://localhost:3001](https://localhost:3001) and the frontend on [https://localhost:3000](https://localhost:3000) (Can take some time to load the first time)

<br />

### **To manually start the project**

standing in the `/workspaces/cleaners-opanel/` directory, run `./scripts/develop.sh` or use dotnet cli by running `dotnet watch --project src/Web` and `cd src/frontend && npm run dev`  

Test suits can be run by running `dotnet test` for a single test run or `dotnet watch test --project Tests/Web.Tests` to have hot-reloading while writing tests.

### **Preview of the application** ###
![image](https://github.com/vihu001/Quote-App/assets/90194213/811affea-dcb3-46a8-88dc-5aa1963674e4)
![image](https://github.com/vihu001/Quote-App/assets/90194213/1e49e374-9c5c-4f42-a583-b56924260171)
<img width="1138" alt="image" src="https://github.com/vihu001/Quote-App/assets/90194213/adfd7f51-e4a1-4fb0-94e1-7b46998ae70d">
<img width="1129" alt="image" src="https://github.com/vihu001/Quote-App/assets/90194213/bb59c678-a10c-4a2e-9e29-98f10e789b08">
<img width="1097" alt="image" src="https://github.com/vihu001/Quote-App/assets/90194213/963957d8-7768-48db-99fe-f0b87c99372a">





