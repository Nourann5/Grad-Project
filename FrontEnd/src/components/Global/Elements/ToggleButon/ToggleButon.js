import React from 'react'
import { useFormContext } from 'react-hook-form';
import styles from './ToggleButon.module.css'
function ToggleButon({name,checked,changeState}) {
    // let changeToggleState=(e)=>{
    //     changeState(e)
    // }
    const { register ,getValues} = useFormContext();
    console.log('ToggleButon')
  return (
    <div className={styles["toggle-button-cover"]}>
        <div className={styles["button-cover"]}>
            <div className={`${styles["toggle-button"]} ${styles["r"]}`} id={styles["button-3"]}>
                <input 
                    name={name} 
                    type="checkbox" 
                    className={styles["checkbox"]}
                    defaultChecked={getValues(name)}
                    {...register(name)}
                />
                <div className={styles["knobs"]}></div>
                <div className={styles["layer"]}></div>
            </div>
        </div>
    </div>
  )
}

export default ToggleButon