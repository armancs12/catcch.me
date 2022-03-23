import styles from "./Logo.module.css";
import Image from "next/image";
import cx from "classnames";

type Props = {
  size?: "small" | "medium" | "large";
  onlyIcon?: boolean;
};

const sizeMap = {
  small: ["LogoSmall", 23 * 2],
  medium: ["LogoMedium", 23 * 3],
  large: ["LogoLarge", 23 * 4],
};

const Logo: React.FC<Props> = ({ size = "medium", onlyIcon = false }) => {
  const [sizeClass, imageSize] = sizeMap[size];

  return (
    <div className={cx(styles.Logo, styles[sizeClass])}>
      <Image
        width={imageSize}
        height={imageSize}
        src="/icons/octopus.svg"
        alt="catcch.me logo"
      />
      
      {!onlyIcon && <span>catcch.me</span>}
    </div>
  );
};

export default Logo;
