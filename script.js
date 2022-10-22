const SKILLS_URL = "https://zany-skitter-caper.glitch.me/skills"

const EXPERIENCE_URL = "https://zany-skitter-caper.glitch.me/experiences"

async function getData(url) {
	try {
		const response = await fetch(url);
		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.log(error);
		return null;
	}
}

async function getDataFromUrl(url, func) {
	const data = await getData(url);
	func(data);
	console.log(data);
}

function populateExperience(data) {
	const experienceBlocks = document.getElementById("experience-blocks");

	data.forEach((dataItem) => {
        const experienceBlock = document.createElement("div");
        experienceBlock.classList.add("experience-block");

        const leftBlock = document.createElement("div");
        leftBlock.classList.add("left-block");

        const rigthBlock = document.createElement("div");
        rigthBlock.classList.add("rigth-block");

        const experienceYears = document.createElement("h5");
        experienceYears.textContent = dataItem.startYear + " - " + dataItem.finishYear;

        const companyName = document.createElement("p");
        companyName.textContent = dataItem.companyName;
        companyName.classList.add("grey");

        const experienceTitle = document.createElement("h5");
        experienceTitle.textContent = dataItem.position;

        const experienceDescription = document.createElement("p");
        experienceDescription.textContent = dataItem.description;

        leftBlock.append(experienceYears, companyName);
		rigthBlock.append(experienceTitle, experienceDescription);
        experienceBlock.append(leftBlock, rigthBlock);
        experienceBlocks.append(experienceBlock);
	});
}

function populateSkills(data) {
	const skillsBlock = document.getElementById("skills-block");

	data.forEach((dataItem) => {
        const skill = document.createElement("div");
        skill.classList.add("skill");

        const skillProperties = document.createElement("div");
        skillProperties.classList.add("skill-properties");

        const programingLanguage = document.createElement("div");
        programingLanguage.textContent = dataItem.title;
        programingLanguage.classList.add("programing-language");

        const percentage = document.createElement("div");
        percentage.textContent = dataItem.level + "%";
        percentage.classList.add("percentage");
        percentage.classList.add("grey");

        const skillBarBorder = document.createElement("div");
        skillBarBorder.classList.add("skill-bar-border");

        const skillBarBackground = document.createElement("div");
        skillBarBackground.classList.add("skill-bar-background");
        skillBarBackground.style.width = dataItem.level + "%";

        skillBarBorder.append(skillBarBackground);
        skillProperties.append(programingLanguage, percentage);
        skill.append(skillProperties, skillBarBorder)
		skillsBlock.append(skill);
	});
}

getDataFromUrl(EXPERIENCE_URL, populateExperience);
getDataFromUrl(SKILLS_URL, populateSkills);
