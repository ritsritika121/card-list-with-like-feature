import { toast } from '../../node_modules/react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: false,
  draggable: false,
  zIndex: 999,
  position:'top-center'
})

export function toastDismiss(){
  toast.dismiss()
}

export function toasterMessage(type, message){
  toast.dismiss()
	toast[type](message, {delay:500})
}

