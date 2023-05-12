#!/bin/bash

REPO="/workspaces/cleaners-opanel"
DOTNET_DEV_CERT="$HOME/.dotnet/corefx/cryptography/x509stores/my/*.pfx"

if [[ ! -f $DOTNET_DEV_CERT ]]; then 
    dotnet dev-certs https 
fi 

if [[ ! -f "./src/frontend/certs/dev-cert.pfx" ]]; then
    echo "copying dotnet dev cert to frontend"
    cp $DOTNET_DEV_CERT ./src/frontend/certs/dev-cert.pfx
fi

if [[ ! -d "./src/frontend/node_modules" ]]; then 
    echo "no node_modules installed, installing...."
    cd src/frontend\
    && npm install\
    && cd $REPO
fi 

echo "checking and updating npm to latest"
npm install -g npm@latest

SESSION="cleaners-opanel"
BACKEND_TESTS_WINDOW=0
FRONTEND_TESTS_WINDOW=1
FRONTEND_WINDOW=2
BACKEND_WINDOW=3

tmux new-session -d -s $SESSION

tmux rename-window -t $SESSION:$BACKEND_TESTS_WINDOW 'backend-tests'
tmux send-keys -t $SESSION:$BACKEND_TESTS_WINDOW 'dotnet watch test --project Tests/Backend.Tests' C-m

tmux new-window -t $SESSION:$FRONTEND_TESTS_WINDOW -n 'frontend-tests'
tmux send-keys -t $SESSION:$FRONTEND_TESTS_WINDOW "cd src/frontend && npm run test" C-m

tmux new-window -t $FRONTEND_WINDOW -n 'frontend'
tmux send-keys -t $SESSION:$FRONTEND_WINDOW "cd src/frontend && npm run dev" C-m

tmux new-window -t $BACKEND_WINDOW -n 'backend'
tmux send-keys -t $SESSION:$BACKEND_WINDOW "dotnet watch --project src/Backend" C-m

tmux attach-session -t $SESSION