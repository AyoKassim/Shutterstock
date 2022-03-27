# Shutterstock Image Analysis and Rating

This is a project where we design a web-based applcation that enables users to upload images and receive feedback about them and their sales potential.
The project builds off a default Next.js template project by adding image upload functionality to the main page, storing the upload, analyzing the image using various metrics, and making this data available at an API route which can be called from the front end.

#### API Keys
Our project makes use of some online APIs for which one must acquire credentials to use.
1. Azure Cognitive Services - Acquire a key and an endpoint [here](https://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows).
2. Imagga Computer Vision API - Acquire authorization [here](https://imagga.com/auth/signup).
3. Shutterstock Image Search API - Open an account [here](https://www.shutterstock.com/api/pricing) then find your credentials at https://www.shutterstock.com/account/developers/apps.

Store these credentials in the project's "/image-analyzer/.env" file in the appropriate variables given.

#### Metrics
We use various metrics to analyze images and they can be found in the "/image-analyzer/metrics" folder. Each metric has an associated javascript module that exports a function which implements it and returns the relevant data. Adding or removing different metrics from the folder is reflected automatically in the app.

### Running the app using Docker (Must have Docker installed and running)
1. Pull the nikolaik/python-nodejs Docker image with the command "docker pull nikolaik/python-nodejs". This image has Python and Node.js installed which are both needed for the project.
2. Clone the repository from GitHub using "git clone https://github.com/AyoKassim/Shutterstock.git".
3. Navigate to the project's 'image-analyser' directory.
4. Run the command "docker-compose up --build". The container starts and installs the necessary dependencies for Python and for Node, then launches the app.
5. The app can be accessed via the url "localhost:3000" in a web browser.

### Running the website without Docker (Must have Python and Node.js installed)
1. Clone the repository from GitHub using "git clone https://github.com/AyoKassim/Shutterstock.git".
2. Navigate to the project's 'image-analyser' directory.
3. Run the command "npm run getall". This runs the getall script which installs the dependencies for Python and for Node.
4. Launch the app with "npm run dev".
5. Access the app in a web browser at the url "localhost:3000".  

## Authors
1. [@aodhanocathain](https://github.com/aodhanocathain)
2. [@AyoKassim](https://github.com/AyoKassim)
3. [@DylanFitzpatrick01](https://github.com/DylanFitzpatrick01)
4. [@francsir](https://github.com/francsir)
5. [@EmilsVasilis](https://github.com/EmilsVasilis)
6. 