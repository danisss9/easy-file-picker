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

export async function getFile(
  options?: FilePickerOptions
): Promise<File | null> {
  const fileInput = createFileInput(false, options);

  const file = new Promise<File | null>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );
      resolve(files[0]);
    };
    fileInput.oncancel = () => {
      resolve(null);
    };
    fileInput.onerror = (_event, _source, _line, _col, error) => {
      reject(error);
    };
    fileInput.click();
  });

  return file.finally(() => fileInput.remove());
}

export async function getFiles(options?: FilePickerOptions): Promise<File[]> {
  const fileInput = createFileInput(true, options);

  const files = new Promise<File[]>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );
      resolve(files);
    };
    fileInput.oncancel = () => {
      resolve([]);
    };
    fileInput.onerror = (_event, _source, _line, _col, error) => {
      reject(error);
    };
    fileInput.click();
  });

  return files.finally(() => fileInput.remove());
}

export async function getFileAsString(
  options?: FilePickerOptions
): Promise<FileStringResult | null> {
  const fileInput = createFileInput(false, options);

  const file = new Promise<FileStringResult | null>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );

      convertFileArrayToFileStringArray(files)
        .then((str) => resolve(str[0]))
        .catch((err) => reject(err));
    };
    fileInput.oncancel = () => {
      resolve(null);
    };
    fileInput.onerror = (_event, _source, _line, _col, error) => {
      reject(error);
    };
    fileInput.click();
  });

  return file.finally(() => fileInput.remove());
}

export async function getFilesAsString(
  options?: FilePickerOptions
): Promise<FileStringResult[]> {
  const fileInput = createFileInput(true, options);

  const files = new Promise<FileStringResult[]>((resolve, reject) => {
    fileInput.onchange = (event: Event) => {
      const files: File[] = convertFileListToFileArray(
        (event.target as HTMLInputElement)?.files
      );

      convertFileArrayToFileStringArray(files)
        .then((str) => resolve(str))
        .catch((err) => reject(err));
    };
    fileInput.oncancel = () => {
      resolve([]);
    };
    fileInput.onerror = (_event, _source, _line, _col, error) => {
      reject(error);
    };
    fileInput.click();
  });

  return files.finally(() => fileInput.remove());
}

export function uploadFilesTo(
  url: string,
  files: File | File[] | Record<string, File>
): Promise<Response>;
export function uploadFilesTo(
  url: string,
  files: File | File[] | Record<string, File>,
  httpMethod: "POST" | "PUT"
): Promise<Response>;
export function uploadFilesTo(
  url: string,
  files: File | File[] | Record<string, File>,
  requestInit: RequestInit
): Promise<Response>;
export async function uploadFilesTo(
  url: string,
  files: File | File[] | Record<string, File>,
  methodOrInit: "POST" | "PUT" | RequestInit = "POST"
): Promise<Response> {
  const formData = filesToFormData(files);
  const init =
    typeof methodOrInit === "string"
      ? {
          body: formData,
          method: methodOrInit,
        }
      : {
          body: formData,
          ...methodOrInit,
        };

  return fetch(url, init);
}

function filesToFormData(
  files: File | File[] | Record<string, File>
): FormData {
  const formData = new FormData();

  if (files instanceof File) {
    formData.append("file0", files);
  } else if (Array.isArray(files)) {
    files.forEach((file, i) => {
      formData.append(`file${i}`, file);
    });
  } else if (typeof files === "object" && files != null) {
    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file);
    });
  }

  return formData;
}

function createFileInput(
  multipleFiles: boolean,
  options?: FilePickerOptions
): HTMLInputElement {
  const fileInput = document.createElement("input");
  fileInput.hidden = true;
  fileInput.type = "file";
  fileInput.multiple = multipleFiles;
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
  const filePromises: Promise<FileStringResult>[] = [];

  for (const file of files) {
    const filePromise = new Promise<FileStringResult>((resolve, reject) => {
      const reader = new FileReader();
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
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file, "utf-8");
    });

    filePromises.push(filePromise);
  }

  return Promise.all(filePromises);
}
