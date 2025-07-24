# Easy File Picker

Easy File Picker is a straightforward library with no dependencies to upload/pick/read files in the browser that can be used with any frontend framework.

## Table of Contents

- [Easy File Picker](#easy-file-picker)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
    - [Vanilla JavaScript](#vanilla-javascript)
    - [Angular](#angular)
    - [React](#react)
    - [Vue](#vue)
    - [Svelte](#svelte)
  - [Functions](#functions)
    - [GetFile](#getfile)
    - [GetFiles](#getfiles)
    - [GetFileAsString](#getfileasstring)
    - [GetFilesAsString](#getfilesasstring)
    - [UploadFilesTo](#uploadfilesto)
  - [Model](#model)
    - [FilePickerOptions](#filepickeroptions)
    - [FileStringResult](#filestringresult)
  - [Error and Cancellation Handling](#error-and-cancellation-handling)
  - [Changelog](#changelog)
  - [FAQs](#faqs)

## Install

```cmd
npm install easy-file-picker
```

## Usage

Examples of how to upload a file in various JavaScript frameworks:

### Vanilla JavaScript

HTML:

```html
<button id="uploader">Upload!</button>
```

JavaScript/TypeScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

document.querySelector("#uploader").addEventListener("click", () => getFile().then((file) => { if(file) uploadFilesTo("http://example.com", file)}));
```

### Angular

HTML:

```html
<button (click)="uploadFile()">Upload!</button>
```

TypeScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

async uploadFile(): Promise<void> {
  const file = await getFile();
  if(file) {
    await uploadFilesTo("http://example.com", file);
  }
}
```

### React

JavaScript:

```jsx
import { getFile, uploadFilesTo } from 'easy-file-picker';

async uploadFile() {
  const file = await getFile();
  if(file) {
    await uploadFilesTo("http://example.com", file);
  }
}

render() {
  return <button onClick={uploadFile}>Upload!</button>;
}
```

### Vue

HTML:

```html
<button @click="uploadFile">Upload!</button>
```

JavaScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

methods: {
  async uploadFile() {
    const file = await getFile();
    if(file) {
      await uploadFilesTo("http://example.com", file);
    }  
  }
}
```

### Svelte

Svelte:

```html
<script>
import { getFile, uploadFilesTo } from 'easy-file-picker';

async function uploadFile() {
  const file = await getFile();
  if(file) {
    await uploadFilesTo("http://example.com", file);
  } 
}
</script>

<button on:click={uploadFile}>Upload!</button>
```

## Functions

### GetFile

Shows a system file dialog where the user can select a single file and returns it. Returns `null` if no file is selected.

```js
function getFile(options?: FilePickerOptions): Promise<File | null>
```

### GetFiles

Shows a system file dialog where the user can select multiple files and returns them. Returns an empty array if no file is selected.

```js
function getFiles(options?: FilePickerOptions): Promise<File[]>
```

### GetFileAsString

Shows a system file dialog where the user can select a single file and returns a string representation of the file content. Returns `null` if no file is selected.

```js
function getFileAsString(options?: FilePickerOptions): Promise<FileStringResult | null>
```

### GetFilesAsString

Shows a system file dialog where the user can select multiple files and returns string representations of the selected files' content. Returns an empty array if no file is selected.

```js
function getFilesAsString(options?: FilePickerOptions): Promise<FileStringResult[]>
```

### UploadFilesTo

Makes an HTTP request to the indicated URL with the files as the body (Content-Type: form data).

```js
// Basic usage (single or multiple files)
function uploadFilesTo(url: string, files: File | File[], httpMethod: 'POST' | 'PUT' = 'POST'): Promise<Response>

// With named files (object)
function uploadFilesTo(url: string, files: Record<string, File>, httpMethod: 'POST' | 'PUT' = 'POST'): Promise<Response>

// With custom RequestInit
function uploadFilesTo(url: string, files: File | File[] | Record<string, File>, requestInit: RequestInit): Promise<Response>
```

## Model

### FilePickerOptions

|       Name       |    Type    | Required | Default |       Description      |
| :--------------: | :--------: | :------: | :-----: | :--------------------- |
|acceptedExtensions|  string[]  |    NO    |    ""   | An array of unique [file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept#unique_file_type_specifiers), describing which file types to allow. |

### FileStringResult

|       Name       |    Type    | Required | Default |       Description      |
| :--------------: | :--------: | :------: | :-----: | :--------------------- |
| name |  string  |    YES    |    undefined   | The name of the file. |
| size |  number  |    YES    |    undefined   | The size of the file in bytes.  |
| type |  string  |    YES    |    undefined   | The [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) type of the file. |
| lastModified |  number  |    YES    |    undefined   | The last modified time of the file, in milliseconds since the UNIX epoch. |
|webkitRelativePath|  string  |    YES    |    undefined   | The path to which the file's URL is relative. |
| content |  string  |    YES    |    undefined   | The string representation of the file's content |

## Error and Cancellation Handling

All file picker functions handle cancellation and errors:

- If the user cancels the dialog or no file(s) are selected, the Promise resolves to `null` (for a single file) or an empty array (for multiple files).
- If an error occurs during file selection or reading, the Promise will reject with the error.

## Changelog

**Version 1.2:**

- added more parameters to `uploadTo` method
- added rimraf dev dependency to delete files cross platform
- updated TypeScript version
- fixed bug in `getFilesAsString` where multiple file selection was disabled
- fixed FileReader race condition when reading multiple files as strings
- improved error handling for file reading operations

---

**Version 1.1:**

- now handles when the user does not select a file
- now handles input errors
- updated examples and documentation
- updated TypeScript version

---

**Version 1.0.4:**

- added example for Svelte
- updated TypeScript version

---

**Version 1.0.3:**

- added git repository
- added FileStringResult type

---

**Version 1.0.2:**

- added example for VueJS

---

**Version 1.0.1:**

- fixed typo in documentation

---

**Version 1.0:**

- published library

## FAQs

No FAQs for now. (⌐■_■)
