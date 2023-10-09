import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
    text: string;
}

const AuthSocialButton = ({ icon: Icon, onClick, text }: AuthSocialButtonProps) => {
    return ( 
        <button
          type="button"
          onClick={onClick}
          className="inline-flex w-full justify-center items-center rounded-lg gap-3 bg-white px-3 py-3 text-gray-500 shadow-sm ring-2 ring-inset hover:ring-blue-700 focus:outline-offset-0"
        >
            <Icon />
            {text}
        </button>
     );
}
 
export default AuthSocialButton;