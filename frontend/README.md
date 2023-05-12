# Cleaners Operator Panel 

## Local Development

### Prerequisites

- Using [devcontainers](https://code.visualstudio.com/docs/devcontainers/containers) with official [node 18 image](https://hub.docker.com/_/node/)


### Quick start

_Using devcontainers_

Install: 

* [Docker and docker compose](https://docs.docker.com/engine/install/)
* [Vs code](https://code.visualstudio.com/) 
* When the project is open for the first time, click yes to install the recommended extensions from the popup shown in the bottom right corner. Alternative go to extensions page in the _Vs Code_ menu to the left and search and install _Dev Containers_  


_ssh-agent_ 

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

_Linux_ 

**Note:**
Mac usually has a ssh-agent running 

check if ssh-agent by running this command in a terminal window 
```
pidof ssh-agent
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

_Starting Dev Container_

When you open the project with the Dev Containers extension installed, Click the popup button `Reopen in Container` in the right bottom.

Open Command Palette `Ctrl+Shift+P` and run the command `Dev Containers: Rebuild and Reopen in Container`

Initial, this will take some time to build the container. A button will show up in the bottom right corner which you can click to show the build process in the terminal window.
