export type FilePickerOptions = {
  acceptedExtensions?: string[];
};

export type FileStringResult = {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;
  content: string;
};

export async function getFile(options?: FilePickerOptions): Promise<File> {
  const fileInput = createFileInput(false, options);

  const file = new Promise<File>((resolve) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );
      resolve(files[0]);
    };
    fileInput.click();
  });

  return file.finally(() => fileInput.remove());
}

export async function getFiles(options?: FilePickerOptions): Promise<File[]> {
  const fileInput = createFileInput(true, options);

  const files = new Promise<File[]>((resolve) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );
      resolve(files);
    };
    fileInput.click();
  });

  return files.finally(() => fileInput.remove());
}

export async function getFileAsString(
  options?: FilePickerOptions
): Promise<FileStringResult> {
  const fileInput = createFileInput(false, options);

  const file = new Promise<FileStringResult>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );

      convertFileArrayToFileStringArray(files)
        .then((str) => resolve(str[0]))
        .catch((err) => reject(err));
    };
    fileInput.click();
  });

  return file.finally(() => fileInput.remove());
}

export async function getFilesAsString(
  options?: FilePickerOptions
): Promise<FileStringResult[]> {
  const fileInput = createFileInput(false, options);

  const files = new Promise<FileStringResult[]>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );

      convertFileArrayToFileStringArray(files)
        .then((str) => resolve(str))
        .catch((err) => reject(err));
    };
    fileInput.click();
  });

  return files.finally(() => fileInput.remove());
}

export async function uploadFilesTo(
  url: string,
  files: File | File[]
): Promise<Response> {
  const filesArray = Array.isArray(files) ? files : [files];
  const formData = new FormData();

  let i = 0;
  for (const file of filesArray) {
    formData.append(`File${i++}`, file, file.name);
  }

  return fetch(url, {
    method: "POST",
    body: formData,
  });
}

function createFileInput(
  multpleFiles: boolean,
  options?: FilePickerOptions
): HTMLInputElement {
  const fileInput = document.createElement("input");
  fileInput.hidden = true;
  fileInput.type = "file";
  fileInput.multiple = multpleFiles;
  fileInput.accept = options?.acceptedExtensions?.join(",") ?? "";
  return fileInput;
}

function convertFileListToFileArray(files: FileList | null): File[] {
  if (files == null) {
    return [];
  }

  const fileArray: File[] = [];
  for (let i = 0; i < files.length; i++) {
    fileArray.push(files[i]);
  }

  return fileArray;
}

async function convertFileArrayToFileStringArray(
  files: File[]
): Promise<FileStringResult[]> {
  const reader = new FileReader();
  const filePromises = [];

  for (const file of files) {
    const filePromise = new Promise<FileStringResult>((resolve) => {
      reader.onload = (event: ProgressEvent<FileReader>) => {
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          webkitRelativePath: file.webkitRelativePath,
          content: event.target?.result as string,
        });
      };
      reader.readAsText(file, "utf-8");
    });

    filePromises.push(filePromise);
  }

  return Promise.all(filePromises) as Promise<FileStringResult[]>;
}
