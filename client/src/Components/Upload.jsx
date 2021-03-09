import React, { useState } from "react";
import useMessage from "../hooks/message.hook";
import { waitForLoad } from "../utils";
import styles from "../css/account.module.css";

export let file;

export const ImageUpload = ({ preview, token, id }) => {
  const [state, setState] = useState({
    imagePreviewUrl: preview,
    style: "cover",
  });

  const message = useMessage();
  const maxSize = 4194304;
  const reader = new FileReader();

  const getExtension = (filename) => {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  };

  const isImage = (filename) => {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "jpeg":
      case "heic":
      case "png":
      case "bmp":
      case "gif":
        return true;
    }
    return false;
  };

  const _handleSubmit = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("userId", id);
    fetch("/api/avatar/upload", {
      method: "POST",
      body: data,
      headers: { "auth-token": token },
    })
      .then((res) => {
        console.log(res.statusText);
      })
      .catch((err) => {
        console.error(err);
        message("Something went wrong, try again later");
      });
  };

  const _handleImageChange = (e) => {
    e.preventDefault();
    file = e.target.files[0];
    if (isImage(file.name)) {
      if (file.size < maxSize) {
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          waitForLoad(
            () => img.width !== 0,
            () => {
              setState({
                imagePreviewUrl: reader.result,
                style: "cover",
              });
              _handleSubmit(file);
            }
          );
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        message("Maximum file size is 4mb");
      }
    } else {
      message("Supported formats: jpg, png, bmp, gif, jpeg");
    }
  };

  return (
    <form>
      <div className={styles.elipse3}>
        <input
          onChange={_handleImageChange}
          className={styles.fileInput}
          name="avatar"
          id="fileInput"
          type="file"
        />
        <div className={styles.imgPreview}>
          <img src={state.imagePreviewUrl} style={{ objectFit: state.style }} />
        </div>
      </div>
    </form>
  );
};
