# PADIS Checks API Reference (generada)

> Auto-generada desde la instalación local de `padislib`.
> Este documento lista únicamente la superficie pública destinada a autores de checks:
> - Namespaces `api.*_checks`
> - Decoradores `padislib.api.decorators.*`
>
> No editar manualmente; editar `gen_padis_api_spec.py` y re-ejecutar.

## Patrón de uso (referencia)

- Crear API: `api = padisapi()`
- Decorar checks con: `@group`, `@title`, `@score`, `@hints`
- Finalizar con: `api.end()`

---

## Decoradores

### `padislib.api.decorators.base_decorator(api, key, arg)`

### `padislib.api.decorators.group(api=None, text=None)`

### `padislib.api.decorators.group_description(api=None, text=None)`

### `padislib.api.decorators.hints(api=None, hints=None)`

### `padislib.api.decorators.score(api=None, value=None)`

### `padislib.api.decorators.title(api=None, text=None)`

---

## Namespaces de checks descubiertos

- `api.accessibility_checks`
- `api.console_checks`
- `api.csharp_checks`
- `api.html_checks`
- `api.jest_checks`
- `api.js_checks`
- `api.plain_text_checks`
- `api.version_control_checks`

---

## accessibility_checks

### `api.accessibility_checks.check_all_rules(html_path)`
- Checks all accessibility rules for the given HTML file.

### `api.accessibility_checks.check_buttons_name(html_path)`
- Checks the accessibility of button names in the given HTML file.

### `api.accessibility_checks.check_color_contrast(html_path, contrast_level='AA')`
- Checks the color contrast of the given HTML file against the specified level.

### `api.accessibility_checks.check_document_title(html_path)`
- Checks the document title in the given HTML file.

### `api.accessibility_checks.check_form_labels(html_path)`
- Checks the form labels in the given HTML file for accessibility.

### `api.accessibility_checks.check_heading_order(html_path)`
- Checks the order of headings in the given HTML file.

### `api.accessibility_checks.check_image_alt(html_path, enforce_descriptive=False)`
- Checks the alt attributes of images in the given HTML file.

### `api.accessibility_checks.check_is_responsive(url)`
- Checks if a page is responsive.

---

## console_checks

### `api.console_checks.run_command(command, expected_output)`
- Runs the specified shell command and checks if the output matches.

---

## csharp_checks

### `api.csharp_checks.check_csharp_class_members(code_or_path, class_name, properties=None, methods=None)`
- Verify that a class declares expected properties and methods.

### `api.csharp_checks.check_csharp_inheritance(code_or_path, child_class, base_classes, require_method_overrides=None)`
- Ensure a class inherits expected bases and overrides required methods.

### `api.csharp_checks.check_csharp_method_body_contains(code_or_path, class_name, method_name, required_snippets)`
- Assert that a method body contains all required snippets.

### `api.csharp_checks.check_csharp_solution_structure(root_path, required_projects=None)`
- Validate that a .sln exists and optionally includes expected projects.

### `api.csharp_checks.check_tdd_used(branch_name)`
- Check if TDD was used on the given branch by detecting consecutive test/implementation commits.

### `api.csharp_checks.validate_csharp_output(project_path, expected_output)`
- Validates the output of a C# project against the expected output.

---

## html_checks

### `api.html_checks.find_label_in_html(route, label_id)`
- Searches if a label with the given id exists in the HTML file.

### `api.html_checks.has_child_tag(route, parent_tag, child_tag)`
- Reads an HTML file and checks for a specific child tag by id.

### `api.html_checks.has_specific_html5_tag(route, tag, args=None, exclude_args=None, string=None, substr=False, count=None)`
- Checks if an HTML file contains a specific tag with given attributes.

### `api.html_checks.run_instructions(path, instructions)`
- Run a list of instructions to check HTML dynamic elements.

### `api.html_checks.tag_is_required(route, tag_name)`
- Checks if a specific tag in the HTML content is marked as required.

---

## jest_checks

### `api.jest_checks.check_jest_coverage(metric, min_coverage)`
- Runs Jest and verifies if the coverage for a specific metric meets the minimum.

### `api.jest_checks.check_jest_tests(min_tests)`
- Checks if the number of Jest tests meets the minimum.

---

## js_checks

### `api.js_checks.check_class_attribute(js_code, class_name, attribute)`
- Checks if a specific attribute (private, public, or static) exists in a JavaScript class.

### `api.js_checks.check_js_function_implemented(js_code, function_name)`
- Check if a JavaScript function or class method is implemented.

### `api.js_checks.check_js_function_signature(js_code, function_name, params=None, param_count=None)`
- Checks if a JavaScript function or method with a specific signature exists.

### `api.js_checks.check_linter()`
- Checks the code for linting issues by running the linter.

### `api.js_checks.check_private_attribute(js_code, class_name, attribute)`
- Checks if a specific private attribute exists in a JavaScript class.

### `api.js_checks.check_public_attribute(js_code, class_name, attribute)`
- Checks if a specific public attribute exists in a JavaScript class.

### `api.js_checks.check_static_attribute(js_code, class_name, static_attribute)`
- Checks if a specific static attribute exists in a JavaScript class.

### `api.js_checks.evaluate_code(code, expected_result, check_sub_string=False)`
- Evaluates the provided JavaScript code and compares the output.

### `api.js_checks.run_javascript_code(file_path, expresion, result, check_sub_string=False)`
- Executes JavaScript code from a specified file and evaluates an expression.

---

## plain_text_checks

### `api.plain_text_checks.check_file_content(file, content)`
- Check if a file contains a pattern specified by a regular expression.

---

## version_control_checks

### `api.version_control_checks.are_git_environment_equals(commands, expected_commands)`
- Compare two Git environments based on branches and commits.

### `api.version_control_checks.check_commit_message(branch, message)`
- Check if there is a commit with a specific message.

### `api.version_control_checks.check_issue_exists(title, body=None)`
- Check if an issue exists in the GitHub repository.

### `api.version_control_checks.check_issues_count(expected_count, state='all')`
- Check if the repository has a specific number of issues.

### `api.version_control_checks.check_pr_exists(title, body=None)`
- Check if a pull request exists in the GitHub repository.

### `api.version_control_checks.is_branch_merged(branch_name, target_branch)`
- Check if a branch has been merged into the target branch.

### `api.version_control_checks.verify_branch_parent(branch, parent_branch)`
- Verify if a branch was created from another branch.

### `api.version_control_checks.verify_file_content_in_branch(branch, file, content)`
- Verifies if a specific file exists in a given branch.

### `api.version_control_checks.verify_last_commit_tag_text(branch, tag)`
- Verifies if the last commit in a branch contains a specific tag text.
