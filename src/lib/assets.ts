// Photos live in src/assets/{owners,eggs,farm} (jpg, jpeg, png, webp) and are
// looked up by file name without the extension. Without a file, the UI shows
// a placeholder.

const glob = (files: Record<string, string>) => files;

const ownerFiles = glob(
  import.meta.glob("../assets/owners/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>
);

const eggFiles = glob(
  import.meta.glob("../assets/eggs/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>
);

const farmFiles = glob(
  import.meta.glob("../assets/farm/*.{jpg,jpeg,png,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }) as Record<string, string>
);

function find(files: Record<string, string>, key: string): string | undefined {
  const match = Object.keys(files).find((path) => {
    const file = path.split("/").pop() ?? "";
    return file.replace(/\.[^.]+$/, "") === key;
  });
  return match ? files[match] : undefined;
}

export const ownerImage = (key: string) => find(ownerFiles, key);
export const eggImage = (key: string) => find(eggFiles, key);
export const farmImage = (key: string) => find(farmFiles, key);
