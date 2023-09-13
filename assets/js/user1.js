const generateEducationId = () => {
  let id;
  while (true) {
    id = Math.floor(Math.random() * (999999 - 100000) + 100000);
    if (usersEducationData.find((i) => i.userEducationId === id)) {
      continue;
    } else {
      break;
    }
  }
  return id;
};

let usersEducationData = [];

let addEducationModal = document.querySelector("#add-new-education-modal");
let addEducationModalForm = document.querySelector(
  "#add-new-education-modal form"
);
let addEducationForm = document.querySelector(".add-new-education-inner form");
let addEducationBtn = document.querySelector(".add-new-education-btn button");
let addEducationCloseBtn = document.querySelector(
  ".add-new-education-close-btn"
);
let addEducationSubmitBtn = document.querySelector(
  ".add-new-education-submit-btn"
);
let allEducationsContainer = document.querySelector(".all-educations");
// fetching users data from db
let user = JSON.parse(localStorage.getItem("loggedInUser"));
console.log(user);

addEducationBtn.addEventListener("click", (e) => {
  addEducationModal.showModal();
  // addEducationModalForm.removeEventListener("submit", updateUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", addUserEducationEvent);
});

addEducationCloseBtn.addEventListener("click", (e) => {
  addEducationModal.close();
  // addEducationModalForm.removeEventListener("submit", addUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", updateUserEducationEvent);
});

addEducationModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let userEducationData = { userId: user.userId };
  let educationFormData = new FormData(
    addEducationModalForm,
    addEducationSubmitBtn
  );

  userEducationData.userEducationId = generateEducationId();
  userEducationData.userEducationDegree =
    educationFormData.get("education-degree");
  userEducationData.userEducationProgram =
    educationFormData.get("education-program");
  userEducationData.userEducationInstitute = educationFormData.get(
    "education-institute"
  );
  userEducationData.userEducationYears =
    educationFormData.get("education-years");

  usersEducationData.push(userEducationData);

  console.log("user", usersEducationData);

  // _______refreshing screen______

  refreshEducationContainer();

  addEducationModal.close();
});

// EXPERIENCE'S FUNCTIONS
const refreshExperienceContainer = () => {

}

// EDUCATION'S FUNCTIONS
const refreshEducationContainer = () => {
  allEducationsContainer.innerHTML = "";
  usersEducationData.forEach((userEduData) => {
    let userEducationContainer = document.createElement("div");
    userEducationContainer.classList.add("education");
    userEducationContainer.id = userEduData.userEducationId;

    // setting data in container
    let userEducationContent = `<h3 class="education-degree-title">${userEduData.userEducationDegree}</h3>
      <div class="education-degree-program"><b>Degree Program -</b> <span>${userEduData.userEducationProgram}</span></div>
      <div class="education-degree-institute"><b>Degree Institute -</b> <span>${userEduData.userEducationInstitute}</span></div>
      <div class="education-degree-years"><b>Degree Duration -</b> <span>${userEduData.userEducationYears}</span></div>
      <div class="education-degree-btns"><button class="education-update-btn">Update</button> <button class="education-delete-btn">Delete</button></div>`;

    userEducationContainer.innerHTML = userEducationContent;

    allEducationsContainer.appendChild(userEducationContainer);

    // updating data in container
    const userEducationUpdate = userEducationContainer.querySelector(
      ".education-update-btn"
    );

    const updateUserEducationForm = userEducationContainer.querySelector(
      "#add-new-education-modal form"
    );
    let educationDegreeInput = document.querySelector(
      "#add-new-education-modal .education-degree"
    );
    let educationProgramInput = document.querySelector(
      "#add-new-education-modal .education-program"
    );
    let educationInstituteInput = document.querySelector(
      "#add-new-education-modal .education-institute"
    );
    let educationYearsInput = document.querySelector(
      "#add-new-education-modal .education-years"
    );
    // adding data in modal's input fields for updation
    userEducationUpdate.addEventListener("click", (e) => {
      e.stopPropagation();
      addEducationModal.showModal();

      educationDegreeInput.value = userEduData.userEducationDegree;
      educationProgramInput.value = userEduData.userEducationProgram;
      educationInstituteInput.value = userEduData.userEducationInstitute;
      educationYearsInput.value = userEduData.userEducationYears;

      refreshEducationContainer();
    });

    // inititalizing updateEducation
    updateUserEducationEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log("uef", usersEducationData, userEduData);

      let i = usersEducationData.findIndex(
        (data) => data.userEducationId === Number(userEduData.userEducationId)
      );
      usersEducationData[i].userEducationDegree = educationDegreeInput.value;
      usersEducationData[i].userEducationProgram =
        educationProgramInput.value;
      usersEducationData[i].userEducationInstitute =
        educationInstituteInput.value;
      usersEducationData[i].userEducationYears = educationYearsInput.value;

      console.log("uef", usersEducationData, userEduData);

      refreshEducationContainer();
    };

    // deleting data from container
    const userEducationDelete = userEducationContainer.querySelector(
      ".education-delete-btn"
    );
    userEducationDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      let userEducationId = userEducationDelete.parentNode.parentNode.id;
      console.log("chidvochd", usersEducationData);
      usersEducationData = usersEducationData.filter(
        (edu) => edu.userEducationId !== Number(userEducationId)
      );
      console.log("chidvochd", usersEducationData);

      refreshEducationContainer();
    });
  });
};

// initialized inside forEach loop above to
let updateUserEducationEvent = null;

const addUserEducationEvent = (e) => {
  e.preventDefault();

  let userEducationData = { userId: user.userId };
  let educationFormData = new FormData(
    addEducationModalForm,
    addEducationSubmitBtn
  );

  userEducationData.userEducationId = generateEducationId();
  userEducationData.userEducationDegree =
    educationFormData.get("education-degree");
  userEducationData.userEducationProgram =
    educationFormData.get("education-program");
  userEducationData.userEducationInstitute = educationFormData.get(
    "education-institute"
  );
  userEducationData.userEducationYears =
    educationFormData.get("education-years");

  usersEducationData.push(userEducationData);

  console.log("user", usersEducationData);

  // _______refreshing screen______

  refreshEducationContainer();

  // addEducationModalForm.removeEventListener("submit", addUserEducationEvent);
  // addEducationModalForm.addEventListener("submit", updateUserEducationEvent);
  addEducationModal.close();
};


// ____________EXPERIENCES______________

const addExperienceModal = document.querySelector("#add-new-experience-modal");
const addExperienceModalForm = document.querySelector("#add-new-experience-modal form");
const addExperienceBtn = document.querySelector(".add-new-experience-btn");
const addExperienceModalCloseBtn = document.querySelector(".add-new-experience-close-btn");
addExperienceModalCloseBtn.addEventListener("click", (e) => {
  addExperienceModal.close();
});

addExperienceBtn.addEventListener("click", (e) => {
  addExperienceModal.showModal();
});
