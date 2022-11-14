# Easy File Picker

Easy File Picker is a straightforward library with no dependencies to upload/pick/read files in the browser that can be used with any frontend framework.

## Table of Contents

- [Easy File Picker](#easy-file-picker)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
    - [Vanila Javascript](#vanila-javascript)
    - [Angular](#angular)
    - [React](#react)
    - [Vue](#vue)
  - [Functions](#functions)
    - [GetFile](#getfile)
    - [GetFiles](#getfiles)
    - [GetFileAsString](#getfileasstring)
    - [GetFilesAsString](#getfilesasstring)
    - [UploadFilesTo](#uploadfilesto)
  - [Model](#model)
    - [FilePickerOptions](#filepickeroptions)
    - [FileStringResult](#filestringresult)
  - [Changelog](#changelog)
  - [FAQs](#faqs)

## Install

```cmd
npm install easy-file-picker
```

## Usage

Example on how to upload a file in various javascript frameworks:

### Vanila Javascript

HTML:

```html
<button id="uploader">Upload!</button>
```

Javascript/TypeScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

document.querySelector("#uploader").addEventListener("click", () => getFile().then((file) => uploadFilesTo("http://example.com", file)));
```

### Angular

HTML:

```html
<button (click)="getFile()">Upload!</button>
```

TypeScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

async getFile(): void {
  const file = await getFile();
  await uploadFilesTo("http://example.com", file);
}
```

### React

Javascript/TypeScript:

```jsx
import { getFile, uploadFilesTo } from 'easy-file-picker';

async getFile(): void {
  const file = await getFile();
  await uploadFilesTo("http://example.com", file);
}

render() {
  return <button onClick={getFile}>Upload!</button>;
}
```

### Vue

HTML:

```html
<button @click="getFile">Upload!</button>
```

TypeScript:

```js
import { getFile, uploadFilesTo } from 'easy-file-picker';

methods: {
  async getFile(): void {
    const file = await getFile();
    await uploadFilesTo("http://example.com", file);
  }
}
```

## Functions

### GetFile

Shows a system file dialog where the user can select a single file and returns it.

```js
function getFile(options?: FilePickerOptions): Promise<File>
```

### GetFiles

Shows a system file dialog where the user can select multiple files and returns them.

```js
function getFiles(options?: FilePickerOptions): Promise<File[]>
```

### GetFileAsString

Shows a system file dialog where the user can select a single file and returns a string representation of the file content.

```js
function getFileAsString(options?: FilePickerOptions): Promise<FileStringResult>
```

### GetFilesAsString

Shows a system file dialog where the user can select multple files and returns string representations of the selected files content.

```js
function getFilesAsString(options?: FilePickerOptions): Promise<FileStringResult[]>
```

### UploadFilesTo

Makes a POST request to the indicated url with the files as the body (content-type: form data).

```js
export declare function uploadFilesTo(url: string, files: File | File[]): Promise<Response>
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
| lastModified |  number  |    YES    |    undefined   | The last modified time of the file, in millisecond since the UNIX epoch. |
|webkitRelativePath|  string  |    YES    |    undefined   | The path the URL of the file is relative to. |
| content |  string  |    YES    |    undefined   | The string representation of the file's content |

## Changelog

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
