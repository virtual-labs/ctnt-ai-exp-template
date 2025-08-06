# AI-Enhanced Virtual Experiment Creation Process
*by VLEAD Team*
## Introduction

With the rapid rise of AI-powered technologies, it's both essential and exciting to harness this potential to streamline the development of Virtual Lab experiments. Tools like the Cursor, Copilot Pro, and Deepseek R1 now enable educators and developers to create interactive, standards-compliant experiments more quickly and efficiently than ever before. This guide provides a step-by-step walkthrough of the process, from setting up your system to building, testing, and refining your experiment using modern, AI-assisted tools.

## Motivation 

Virtual Labs democratize access to high-quality, interactive learning experiences — especially in STEM education. However, building these labs from scratch can be resource-intensive. By integrating intelligent development environments and standardised tools, this process can be significantly accelerated, allowing teams to focus on content quality and pedagogical value rather than just infrastructure.

## Audience

This guide is intended for:

* Educators and subject matter experts are looking to convert traditional lab experiences into virtual formats.  
* Developers contributing to the Virtual Labs ecosystem.  
* Institutions or teams onboarding new contributors to the Virtual Labs project.

Whether you're just starting or need a refresher on best practices, this document outlines the procedure for setting up your environment, preparing content, and building a Virtual Lab experiment using the AI Tools, VSCode editor and the lab management tools.


# Disclaimer & Expectations {#disclaimer-expectations}
Please note: This AI-assisted workflow is a suggested process, not a guaranteed formula. Its effectiveness depends on several critical factors:

* Well-written lab proposals: Clear objectives, scope, and simulation intent are essential.

* Realistic expectations: Simulation complexity should align with available tools and deliverability.

* Iterative refinement: Simulations may require multiple rounds of review and adjustment by both developers and SMEs.

* Guidelines intended: Consider this coherent workflow a tool for acceleration—not a one-size-fits-all solution.

Proceed with an open mind, ready to adapt as needed.

## Guidelines for Creating a Virtual Lab Experiment
### Step 1 Getting Started 
Before you begin developing a Virtual Lab experiment using AI tools, it's important to complete a few preparatory steps. This section ensures that you have the necessary background, approvals, and environment setup. Completing these steps will help you generate high-quality, standards-compliant experiments efficiently.

#### a. Prerequisites

1. Ensure you have the **proposal document** for the lab.  
2. **Confirm with your Subject Matter Expert (SME)** the intended level of the lab/experiments — beginner, intermediate, or advanced — so you can reflect this accurately in the AI prompt.  
3. You should be **familiar with the Virtual Labs development process** and have completed the onboarding steps as outlined [here](https://vlead.vlabs.ac.in/development/#onboarding-process).

#### b. Setup

**Download and Install VSCode**

Download the latest version of Visual Studio Code from [here](https://code.visualstudio.com/download).

**Get the Github Education Pack**

If you are a student, apply for the [GitHub Education Pack](https://education.github.com/pack) to get access to free resources. After that, activate the Copilot Pro subscription for free.

**Install Live Server Extension**

Open VS Code and install the Live Server extension. This is required to serve your experiment locally for testing purposes.

**Install CoPilot Extension**

Install the GitHub Copilot extension in VS Code. This will enable AI-assisted coding features that can help you write code more efficiently. Use the `Agent` mode in the Copilot settings to give it more control on the environment.

**Choose an AI Model**

We have used **Claude-4-sonnet** as the AI model in our CoPilot settings. However, you are free to choose the latest tested version or any other AI tool that you find appropriate or are more comfortable with.

#### c. Clone the Repository

1. Create a Working Directory. Create a dedicated folder to store your AI Tool based experiment projects.  
2. Clone the Experiment Repository inside your working directory, and clone the development branch of your experiment repository using the command below. Replace your-experiment-repository-link with the actual repository URL:

git clone \-b dev \<your-experiment-repository-link\>

3. This is roughly how it should look:

├── experiment  
│   ├── aim.md  
│   ├── experiment-name.md  
│   ├── images  
│   │   └── README.md  
│   ├── posttest.json  
│   ├── pretest.json  
│   ├── procedure.md  
│   ├── README.md  
│   ├── references.md  
│   ├── simulation  
│   │   ├── css  
│   │   │   ├── main.css  
│   │   │   └── README.md  
│   │   ├── euler.html  
│   │   ├── hamiltonian.html  
│   │   ├── images  
│   │   │   └── README.md  
│   │   ├── js  
│   │   │   ├── euler.js  
│   │   │   ├── main.js  
│   │   │   ├── README.md  
│   │   │   └── tsc.js  
│   │   └── travelingsalesperson.html  
│   └── theory.md  
├── LICENSE  
├── pedagogy  
│   ├── images  
│   │   └── README.md  
│   └── README.md  
├── README.md  
└── storyboard  
    ├── flowchart  
    │   └── README.md  
    ├── mindmap  
    │   └── README.md  
    ├── README.md  
    └── storyboard  
        └── README.md

**Additional Pages**  
If you plan to add pages beyond those defined in the standard structure, include [an experiment-descriptor file](https://drive.google.com/file/d/1goTRGG1Vdk85fSF4G33NEeljo4ZGLzJ4/view?usp=drive_link) **outside** the experiment folder. Follow the [link](https://github.com/virtual-labs/ph3-lab-mgmt/blob/master/docs/exp-side-menu.md) for detailed instructions to customize the side menu.  
**Ex.** In all the experiments for the Semiconductor Lab  a [Did You Know / Fact Vault Page](https://github.com/virtual-labs/ctnt-ai-exp-template/blob/73ec96c3ebd4081e280331298c5e1f6174bd1bb5/template%203/Fact%20Vault/Fact_Vault.html) has been added, such pages can be added in the experiment by declaring them in the [experiment-descriptor file](https://github.com/virtual-labs/ctnt-ai-exp-template/blob/73ec96c3ebd4081e280331298c5e1f6174bd1bb5/template%203/Fact%20Vault/experiment-descriptor.json#L45) as a simulation, enriching the simulation experience for the user. [Link](https://virtual-labs.github.io/exp-pn-junction-diode-iiith/didyouknow_pnjunction.html) to the Fact Vault Page. 

   

### Step 2 Creating the Simulation

In this step, you will define the visual layout of your experiment and implement its underlying logic. We encourage you to start by using the recommended responsive UI template, which provides a clean layout, floating controls, and mobile-friendly design. Next, using your lab’s proposal document, provide the experiment objective and structure to your AI assistant (like GitHub Copilot) to begin generating the required HTML and JavaScript logic. You’ll iteratively test, debug, and refine the experiment until it behaves as expected.

#### Choosing a Starter UI Template for Your Experiment
First, decide on the initial UI layout for the experiment. Some good starter templates are:

1) [Discrete Labs \- Recursion](https://github.com/virtual-labs/ctnt-ai-exp-template/tree/main/template%201)

This experiment features a clean and user-friendly interface, with floating buttons for instructions and controls embedded directly within the UI. This layout is ideal when there are multiple instructions to convey but limited screen space, as it helps declutter the view while maintaining accessibility.

2) [Automata Lab \- PushDown Automata](https://github.com/virtual-labs/ctnt-ai-exp-template/tree/main/template%202)

This experiment features a simple, clean white UI without floating buttons. Instead, it includes a quick guide for instructions. This template is well-suited for cases where instructions are minimal and all controls need to remain visible and frequently used by the user. 

3) [Semiconductors Lab \- PN Junction Diode](https://github.com/virtual-labs/ctnt-ai-exp-template/tree/main/template%203)

This experiment features a simple, clean white user interface, free from floating buttons, ensuring an uncluttered and distraction-free experience. The layout is ideal for simulations where all controls need to remain visible and readily accessible at all times. Additionally, the experiment includes a guided tour that walks the user through each component of the simulation explaining the purpose and function of every slider, button, and their corresponding effects. To reinforce learning, a dedicated Challenges section is also provided, allowing users to test their understanding through interactive quizzes and activities. [Link](https://virtual-labs.github.io/exp-pn-junction-diode-iiith/simulation.html) to the simulation. 

Each template also  includes the following features:

* A consistent and clean color theme for the experiment  
* Mobile-friendly(not necessary but better to have) , responsive design  
* Floating buttons for improved usability  
* Well-placed panels for input and simulation areas  
* A mobile detection script to see if the user is using it in a phone or in a desktop and provide the user with appropriate messages.


#### Figuring out the Logic of the Experiment
* First, locate the **Lab Proposal Document**. You can search for your lab [here](https://github.com/virtual-labs/engineers-forum/issues).  
* Next, in **Copilot**, add the `experiment.html` and `experiment.js` files to the context. Then, provide Copilot with all relevant details from the Lab Proposal Document. Based on this input, Copilot should automatically generate the experiment logic and make the necessary edits in **Agent Mode**.  
* Run the page using **Live Server** to preview the changes and test the experiment logic. Open the browser console to check for any JavaScript errors or warnings.  
* If errors appear, you can ask Copilot to resolve them by providing the error message along with the relevant code snippet or file in the context.  
* Use the following **Starter Prompt** (highlighted in blue). Replace the placeholder text (highlighted in red) with the specifics of your experiment.  
  <span style="color: blue;">The content of the experiment is about</span> <span style="color: red;">[describe the topic possibly from the Proposal]</span>.  
  <span style="color: blue;">Edit the content of the HTML and the JS template  file to accurately work for the current experiment.</span>  
  <span style="color: blue;">Make sure that whatever you do, does not break anything.</span>  
  <span style="color: blue;">No need to keep the old redundant code for the template. Feel free to remove them and optimise the space</span>  
  <span style="color: blue;">Do not change the basic structure of the HTML file.Since, I want this type of layout only.</span>  
 <span style="color: blue;">Feel free to change the text in the HTML file to reflect correctly for the current experiment</span>  
 <span style="color: blue;">Do not change the existing CSS </span> <br>
    <span style="color: red;">OPTIONAL</span>  
  <span style="color: blue;">I have also given you some code below to help you with the task.</span>  
  <span style="color: red;">The Existing Code </span>

#### Debugging Experiment Logic with AI Assistance

* Start by checking the **console** for any errors or warnings.  
* If the experiment logic isn't working as expected even after a few attempts, try **manually debugging** the code using `console.log` statements. This will help you trace the code execution and inspect variable values at different points.  
* If the issue persists, you can share your `experiment.html` and `experiment.js` files with **reasoning-focused AI models** such as **Deepseek R1**, **Gemini 2.5 Pro**, or **OpenAI Codex**. These tools are particularly effective at understanding and resolving logic-related issues. You can try them for free on [Yupp](https://yupp.ai).  
* With a bit of time and effort, you should be able to get the experiment logic working as intended.


#### UI Optimization Tips for Better Usability

* Use **floating buttons** to hide controls that are only needed during the initial setup of the experiment. This helps declutter the interface and improves user experience.  
* Consider adding a **compact instructions panel** accessible via a floating button that can be toggled on or off. This allows users to refer to guidance without crowding the main interface and if at all you need the controls at all times of the experiment (better to move it to one side) make sure that no scrolling is required by the user to view the whole page.  
* If the experiment is not fully optimized for mobile devices, consider adding a **JavaScript script (like** [this](https://github.com/virtual-labs/ctnt-ai-exp-template/blob/main/mobile-detection.js)**)**   to notify users  how to enhance responsiveness and usability on smaller screens.

### Step 3 Creating the Content

Next, you will generate the content for your experiment using an AI tool. We recommend starting with the **standard prompt** provided below (highlighted in blue). While we have tested this prompt using **Cursor**, you are free to use any AI tool you are comfortable with.

To proceed:

* Replace the **placeholder text** in the prompt (highlighted in red) with details specific to your experiment.  
* Set the entire **experiment** folder as the **context** for your AI tool to ensure consistent and structured output.  
* Feel free to **customize the prompt** based on your specific requirements.

**Experiment Content Structure**

**Required .md Files:**

  * aim.md  
  * theory.md 
  * procedure.md  
  * references.md  
  * contributors.md

* **Required .json Files:**  
  * pretest.json
  * posttest.json

* **Optional empty .md Files to be added  (if needed):**   
  * troubleshooting.md
  * glossary.md  
  * trivia.md  
  * extended-study.md  
  * assessment.md

**Sample Prompt**

<p style="color:blue;">You are an expert in creating content for the experiments for Virtual Labs.   
I have a sample experiment that I want to convert into a Virtual Lab experiment. Modify the current markdown & json files to create the textual/visual content of the experiment  
Refer to the README file located in the ‘experiment’ folder for creating content.</p>
<ol style="color:blue;">
<li>aim.md, objective.md, and theory.md need to be filled up with the respective content. Modify their content as per the page type in the context of the experiment name  <span style="color:red;">your-experiment-name</span> for the lab <span style="color:red;">lab-name.</span> Be sure these changes are in sync with the simulation we just implemented. Use images, graphs etc to support your content, if needed.</li>
<li>Modify procedure.md as per the simulation changes just been implemented.</li>   
<li>Provide suitable references like books, educational material, video links, publications, articles, in references.md.</li>  
<li>The quiz pages- pretest.json and posttest.json follow a certain format and logic. Without changing the format, update the questions, answers, along with their respective explanations. The questions are of 3 difficulty levels- beginner, intermediate, and advanced. Note that the content should be consistent with the experiment. Ensure questions are relevant, well-worded, and aligned with the learning objectives of the experiment.</li>  
<li> For contributors.md, fill in the following details in the format given in the file. Do not create a new format.</li>  
   <ol><li><span style="color:red;">Subject matter expert’s details</span></li>
   <li><span style="color:red;">Developer’s details</span></li></ol></ol>

Do not create any new files or folders. Only edit the existing files.

### Step 4 Build and Test the Experiment

Once your experiment content is ready and structured, the next step is to build and test it using the Virtual Labs build process. This ensures your experiment renders correctly, passes validation checks, and is ready for deployment. This step also allows you to preview the experiment locally and make iterative improvements as needed.

1. **Make Changes**  
   1. Edit the necessary .md files and simulation files within your experiment directory as detailed in the previous steps.   
   2. Cursor currently does not support image generation for the prompt in Step 3\. You may use other AI tools or create the images manually, and place them in the appropriate locations within the directory structure.  
2. **Clone the Lab Management Tool**  
    Clone the lab management repository and navigate into its directory:  
   *git clone https://github.com/virtual-labs/ph3-lab-mgmt.git*  
   *cd ph3-lab-mgmt*  
3. **Build with Validation**  
    Run the following command to validate your experiment:

   *node main.js build \--validateEslint \--validateExpdesc \--src=../your-experiment-folder*

If you encounter issues with missing modules, install them using:

*npm install cjs*

*npm install shelljs*

4. **Launch Local Server**  
    Navigate to the built directory and start the server:  
   *cd \<path-to-your-experiment-directory\>/build/*  
   *npx live-server .*

Open the URL in **incognito mode** to verify that recent changes are reflected.

5. **Rebuild After Updates**  
    If you make further changes, rebuild using:  
   *cd \<path-to-ph3-lab-mgmt-folder\>*

   *node main.js build \--clean \--validateEslint \--validateExpdesc \--src=../your-experiment-folder/build/*  
6. **Repeat as Needed**  
   Repeat steps 2 to 4 as required until the experiment is complete and validated.

---

## Guidelines to Follow

1. Complete one full experiment—starting with the simulation—and get explicit SME approval on scope, UI/UX, layout, and content **before** beginning work on any other experiments.   
2. You might want to format the references page using the "Reference Page" section from [this experiment](https://virtual-labs.github.io/exp-word-analysis-iiith/references.html) as a guide.  
3. Remember to reflect these additions in the [experiment-descriptor](https://drive.google.com/file/d/1goTRGG1Vdk85fSF4G33NEeljo4ZGLzJ4/view?usp=drive_link) file  
4. Refer to the [latest Cursor documentation](https://docs.google.com/document/d/1ih8I4oFB0lucWagXKkyZcmSSx2K4K_ukrfzGtgzAiCU/edit?usp=drive_link) to ensure you're using the tool effectively and taking advantage of the latest features.  
5. Follow the naming convention for repositories: `exp-short-name-institute-name`. This is defined during [onboarding](https://vlead.vlabs.ac.in/development/#onboarding-process). If the convention is not followed, the build ( Step 4\) will fail.

## Actions to Avoid

1. Do not rename or add new file types or folders beyond the standard Virtual Labs experiment structure described in Step 1\. Only update the existing .md and .json files—**except** for optional additions like Troubleshooting, Glossary, and Assessment pages, which are permitted if you update the relevant prompts and reflect them in the experiment-descriptor.json file.  
2. Do not push the build directory to the repository. Use a .gitignore file to prevent accidental commits of unnecessary files.  
3. Do not push simulation code to the repository without completing the full experiment as outlined in [Step 4](#step-4---build-and-test-the-experiment).  
4. Do not forget to validate JSON files before committing. Use tools like [JSONLint](https://jsonlint.com/) to ensure proper formatting.  
5. Do not deviate from the structure and style of your first experiment. Use it as a template for all subsequent experiments to ensure consistency and save time.

## Frequently Asked Questions

1. **How much time should it take to build a basic simulation for an experiment?**  
   If the simulation design is well thought out in advance, building the simulation should take only **3 to 6 hours**, especially when using AI tools like CoPilot.  
     
2. **How much time should it take to complete the content for an experiment?**  
   Once the simulation is ready, creating the entire experiment content should take **10 to 15 minutes**.  
     
3. **What is the role of the SME (Subject Matter Expert)?**  
* The SME defines the **scope and difficulty level** of the experiment through their written lab proposal.  
* They are responsible for reviewing and approving the simulation layout and logic, allowing the developer to proceed with implementation. They are also expected to provide feedback and suggestions to enhance the interactivity of the simulation, ensuring it functions like a true experiment — where students can make mistakes, learn from them, and refine their understanding through hands-on engagement.  
* After the simulation and content are completed and tested using the Virtual Labs build process, the SME must perform a **final review** of the entire experiment.


4. **How can I add extra content files to the experiment?**  
   In addition to the standard files and folders defined in the Virtual Labs experiment structure, you may include extra pages such as **Troubleshooting**, **Glossary**, and **Assessment**.  
   To do this:  
* Update the prompt outlined in Step 3 to include each new page you add.   
* Reflect these additions in the experiment-descriptor.json file, following the required format.

5. **Does the academic level of an experiment affect development time?**  
   Yes. Clarify the intended level (e.g., beginner or advanced) with the SME.  
   SME may choose to adjust the experiment title to reflect its level—for example, by adding words like *“Advanced”* or *“Higher”*.  
   Once the level is defined, review the prompts to ensure they guide the creation of content appropriate to the specified level.  
     
6. **Where can I get support if I have questions?**  
   For any queries, you can reach out to the VLEAD team at support@vlabs.ac.in.

## Conclusion

By following the steps outlined in this document, you’ll be well-positioned to create a Virtual Lab experiment that is structured, maintainable, and aligned with Virtual Labs' quality benchmarks. Leveraging the power of AI-based tools like CoPilot & Cursor can significantly accelerate the development process and provide a strong starting point. However, it's important to recognize that AI-generated content is not flawless. These tools are still evolving and may produce hallucinations or inaccuracies. As such, human expertise remains critical. Subject matter experts and developers must thoroughly review the generated content, refine it with additional and more precise prompts, and validate it against learning objectives. Iterative testing and enrichment will ensure that the final experiment is not only technically sound but also pedagogically effective and accurate. In short, use AI to boost productivity — but rely on expert insight to ensure quality.
