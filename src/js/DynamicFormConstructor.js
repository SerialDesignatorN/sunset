const createForm = (blueprint) => {
    // Create form based on the blueprint
    var dynamicForm = document.getElementById("dynamic-form");
    dynamicForm.innerHTML = ''

    blueprint.contents.forEach(function (field) {
        var label = document.createElement("label");
        label.textContent = field.fieldHumanReadableName;

        var input;
        switch (field.fieldType) {
            case "color":
                input = document.createElement("input");
                input.type = "color";
                input.className = 'color-picker-generic';
                input.value = field.defaultValue;
                break;
            case "number":
                input = document.createElement("input");
                input.type = "number";
                input.className = 'text-input-generic';
                input.placeholder = field.fieldPlaceholder;
                input.value = field.defaultValue;
                break;
            case "textbox":
                input = document.createElement("textarea");
                input.className = 'text-input-generic';
                input.placeholder = field.fieldPlaceholder;
                input.value = field.defaultValue;
                break;
            default:
                // Handle unknown field types
                break;
        }

        input.id = field.fieldName;
        input.name = field.fieldName;

        dynamicForm.appendChild(label);
        dynamicForm.appendChild(input);
    });

    // Add "Done" button
    var button = document.createElement("button");
    button.textContent = "Done";
    button.className = 'submit-form'
    button.addEventListener("click", submitForm);
    dynamicForm.appendChild(button);

    // Function to handle form submission
    function submitForm() {
        // Get form data
        var formData = {};
        blueprint.contents.forEach(function (field) {
            formData[field.fieldName] = document.getElementById(field.fieldName).value;
        });

        // Create and log the eval action
        var evalAction = blueprint.evalAction + '(' + JSON.stringify(formData) + ')';
        console.log(evalAction);
        eval(evalAction)

        // You can send this eval action to your backend or use it as needed
    }
}