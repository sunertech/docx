import * as unzipper from "unzipper";

const main = async () => {
    const zip = await unzipper.Open.file("My Document.docx");
    await zip.extract({
        path: "My Document.docx.unpacked",
    });
};

main();
