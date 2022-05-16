"# sph_unity_utwcc_poc" 
## Building and Running the project

1. Open wsl/ubuntu terminal then Clone Repository using this command.
    - git clone `https://github.com/framgia/sph_unity_utwcc_poc.git`

2. Launch Unity Hub and open the project through *`sph_unity_utwcc_poc > unity`*

3. Click on File > Build Settings
     - Under platform, click on WebGL and then click Build.  *(if you don't have yet, you can just click install with unity hub)*
     - Then select the client folder in sph_unity_utwcc_poc and build the project there. *(`sph_unity_utwcc_poc > client`)*

4. In the terminal, redirect to the "react" folder by using `cd react` 
5. Then install the packages through `npm install`
6. Go to your client folder where you recently built the project and copy   the `Build` folder `(sph_unity_utwcc_poc > client`)
7. Paste it in the "public" folder in your React directory      *(`sph_unity_utwcc_poc > react > public`)*
8. Then to run the project, use `npm run start` command in the terminal inside react folder


