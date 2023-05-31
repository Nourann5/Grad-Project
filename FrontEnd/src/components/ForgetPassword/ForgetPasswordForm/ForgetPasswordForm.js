import React from 'react'
import styles from './ForgetPasswordForm.module.css'
import forgetSrc from 'assets/imgs/forget.png'
function ForgetPasswordForm() {
    return (
        <>
            <div className={styles["forget-form-content"]}>
                <div className={styles["forget__form-content-container"]}>
                    <img src={forgetSrc} className={styles["forget__icon"]} alt="forget icon"/>
                    <p className={styles["forget-form-title"]}>Forget Password ?</p>
                    <p className={styles["forget-form-second-title"]}>No Worries, We'll Send You Reset Instructions</p>
                    <form className={styles["forget-form"]}>
                        <div className={styles["form__input-cont"]}>
                            <label htmlFor="form__input-email" className={styles["form__input-label"]}>Email</label>
                            <input type="email" className={styles["form__input"]} id="form__input-email" placeholder="Type Email Here"/>
                        </div>
                        <button type="submit" className={styles["form__submit"]}>Reset Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPasswordForm