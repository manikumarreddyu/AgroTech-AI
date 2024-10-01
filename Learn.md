# Learn.md
## Table of Contents
1. [Introduction](#introduction-)
2. [Tech Stack](#tech-stack-)
3. [Contributing](#contributing-)
   - [Development Workflow](#development-workflow)
   - [Issue Report Process](#issue-report-process)
   - [Pull Request Process](#pull-request-process-)
4. [Setting Up on your machine](#setting-up-on-your-machine-)
5. [Resources for Beginners](#resources-for-beginners-)
   - [Basics of Git and GitHub](#basics-of-git-and-github-)
6. [Documentation](#documentation-)
7. [Code Reviews](#code-reviews-)
8. [Feature Requests](#feature-requests-)
9. [Spreading the Word](#spreading-the-word-)


## Introduction 🖥️
Welcome to Style Share, a simple web-based platform where users can easily create, explore, and share Tailwind CSS components and designs with fellow users.

## Tech Stack 🗃️
The project is built using the following technologies:

- TypeScript
- Express
- React
- Recoil
- Prisma + MongoDB
- Tailwind CSS

## Contributing 📝
Raise and issue; Get assigned and then work on fixing the issue.
We welcome contributions to College.ai! Follow these steps to contribute:

1. **Fork the Repository**: Create your own copy of the repository on your GitHub account.
![image](https://github.com/debangi29/StyleShare/assets/117537653/b33a38b0-ea03-4adf-88ac-b1ea8f177b84)


2. **Clone the Repository** : Clone the repository for making commits.
   ```bash
   git clone https://github.com/VaibhavArora314/StyleShare.git
   ```
      <br>
   
![image](https://github.com/debangi29/StyleShare/assets/117537653/162abab4-04eb-4e41-99f2-da702bac656b)


3. **Create a New Branch** for your feature or bug fix: Make a separate branch to work on specific features or fixes and switch to the correct branch.
```bash
git checkout -b <new-branch-name>
```
4. **Make Changes** and commit them: Implement your changes and save them with a descriptive commit message.
```bash
git add .
git commit -m "Describe your changes"
```
5. **Push Your Changes** to your fork: Upload your committed changes to your GitHub fork.
   ```bash
   git push origin <branch_name>
   ```
6. **Create a Pull Request ✅**: Propose your changes to be merged into the original repository.
   <br>
   
![image](https://github.com/debangi29/StyleShare/assets/117537653/5ff97d14-0145-45fe-ac44-9cb187624815)

### Development Workflow
- Always work on a new branch for each issue or feature.
- Keep your branch up to date with the main repository's master branch.
- Write clear and descriptive commit messages.
- Test your changes thoroughly before submitting a pull request.

### Issue Report Process
1. Go to the project's issues section.
2. Select the appropriate template for your issue.
3. Provide a detailed description of the issue.
4. Wait for the issue to be assigned before starting to work on it.

### **Pull Request Process 🚀**

1. Ensure that you have self reviewed your code.
2. Make sure you have added the proper description for the functionality of the code.
3. I have commented my code, particularly in hard-to-understand areas.
4. Add screenshot it help in review.
5. Submit your PR by giving the necesarry information in PR template and hang tight we will review it really soon.

# Setting Up on your machine ⚙️
1. Go to the backend folder and create a .env file
    ```
    DATABASE_URL="Mongodb Connection String here"
    JWT_SECRET="secret"
    PORT=3001
    ```
2. Run the following commands in the backend folder
    ```
    npm install
    npm run build
    npm run dev
    ```
    The npm run build cmd will handle the Prisma migrations, and also build the frontend folder which will be served by the express server.
    
    Possible Problems:
    - Prisma may give error for MongoDB replica set, in such case use Mongodb atlas for the database instead of the local database or start a Mongo docker container with the replica set.
3. In case you are modifying the frontend and you want hot module reloading, then run the following commands in the frontend directory
    ```
    npm install
    npm run dev
    ```
    Also, set the default base URL of the backend (don't push this to GitHub) or simply uncomment the following:
    https://github.com/VaibhavArora314/StyleShare/blob/ffb31d5bd3f68fbd76b300a736d56c2a0f1f77ac/frontend/src/App.tsx#L17-L18

## Resources for Beginners 📚
### Basics of Git and GitHub 📂
- [Forking a Repo](https://help.github.com/en/articles/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/articles/cloning-a-repository)
- [Creating a Pull Request](https://help.github.com/en/articles/creating-a-pull-request)
- [Getting Started with Git and GitHub](https://guides.github.com/introduction/git-handbook/)
- [Learn GitHub from Scratch](https://www.youtube.com/watch?v=w3jLJU7DT5E)


## 📍Documentation
- Document any significant changes or additions to the codebase.
- Provide clear explanations of the functionality, usage, and any relevant considerations.

## Code Reviews 🔎
- Be open to feedback and constructive criticism from other contributors.
- Participate in code reviews by reviewing and providing feedback.

## Feature Requests 🔥
- Suggest new features or improvements that would enhance the project.

## Spreading the Word 👐
- Share your experience and the project with others.
- Spread the word about the project on social media, developer forums, or any relevant community platforms.



Thank you for contributing to College.ai! Together, we can make a significant impact. Happy coding! 🚀
Don't forget to ⭐ the repository!
   
