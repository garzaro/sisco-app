import {useState} from "react";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "react-day-picker";
import {Eye, EyeOff} from "lucide-react";

/**reutilizaevl depiois colocar em components**/

export function PasswordInput({name, label}) {
  const [show, setShow] = useState(false);
  const {register, formState:{ errors }} = useForm(); //useFormContext()

  return(
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={show ? "text" : "password"}
        {...register(name)}
        className="pr-10"
      />

      <Button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-zinc-400"
      >
        {show ? <EyeOff size={18} /> : <Eye size={18}/>}
      </Button>

      {errors[name] && (
        <span className="text-red-300 text-sm">
          {errors[name].message}
        </span>
      )}

    </div>
  )

}