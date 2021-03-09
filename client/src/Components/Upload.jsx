import styles from "../css/account.module.css";

export const ImageUpload = () => {
  return (
    <form>
      <div className={styles.elipse3}>
        <input
          className={styles.fileInput}
          name="avatar"
          id="fileInput"
          type="file"
        />
        <div className={styles.imgPreview}>
          <img src={""} style={{ objectFit: "cover" }} />
        </div>
      </div>
    </form>
  );
};
