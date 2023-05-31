import React, { useState } from 'react'
import styles from './TestResultTableRow.module.css'
import {ReactComponent as DownArrowIcon} from 'assets/icons/downArrowResults.svg'
import { Collapse } from 'react-bootstrap';
function TestResultTableRow({user}) {
    const [open, setOpen] = useState(false);
  return (
    <>
        <tr key={user?.id+user?.user_name+user?.user_email}>
            <th scope="row">{user?.id}</th>
            <td>B</td>
            <td>A</td>
            <td>
                {
                    <>
                        <p className={`${styles['table__user-status']} ${user?.status ==0?'':'d-none'}`}>
                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--new']}`}></span>
                            <span className={styles['table__user-status-value']}>Not Answered</span>
                        </p>
                        <p className={`${styles['table__user-status']} ${user?.status ==1?'':'d-none'}`}>
                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--active']}`}></span>
                            <span className={styles['table__user-status-value']}>Correct</span>
                        </p>
                        <p className={`${styles['table__user-status']} ${user?.status ==2?'':'d-none'}`}>
                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--blocked']}`}></span>
                            <span className={styles['table__user-status-value']}>Wrong</span>
                        </p>
                    </>
                }
            </td>
            <td>
                <button
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <DownArrowIcon className={styles['table__user-down-arrow']}/>
                </button>
            </td>
        </tr>
        <tr>
            <td colSpan={5} className={`p-0`}>
                <Collapse in={open}>
                    <div>
                        <div className={styles['table__row-collapsed']}>
                            <div className={`${styles['test-result__table-collapse-info']} ${user?.status ==1?styles['test-result__table-collapse-info--correct']:styles['test-result__table-collapse-info--not-correct']}`}>
                                <h2 className={styles['test__info-heading']}>
                                    Questions 1-10 are based on the following passage.
                                </h2>
                                <p>
                                    Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.
                                </p>
                                <p>
                                    Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.
                                </p>
                                <p>
                                    Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.
                                </p>
                                <p>
                                    Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.
                                </p>
                            </div>
                            <div className={`${styles['test-result__table-collapse-question']} ${user?.status ==1?styles['test-result__table-collapse-question--correct']:styles['test-result__table-collapse-question--not-correct']}`}>
                                <h2 className={styles['test__question-heading']}>
                                    Which choice best describes what happens in the passage?
                                </h2>
                    
                                <div className="test__input-answer">
                                {/* <input type="text" className="form-control" name="test__input-answer1" placeholder=""ظ> */}
                                </div>
                    
                                <div className={styles["test__choices-wrapper"]}>
                                    <div className={`${styles['test__choice-wrapper']} ${styles['test__choice-wrapper--correct']}`}>
                                        <span className={styles["test__choice-alpha"]}>A- </span>One Character Argues With Another Character Who Intrudes On  
                                    </div>
                                    <div className={`${styles['test__choice-wrapper']}`}>
                                        <span className={styles["test__choice-alpha"]}>B- </span>One Character Argues With Another Character Who Intrudes On  
                                    </div>
                                    <div className={`${styles['test__choice-wrapper']} ${styles['test__choice-wrapper--not-correct']}`}>
                                        <span className={styles["test__choice-alpha"]}>C- </span>One Character Argues With Another Character Who Intrudes On  
                                    </div>
                                    <div className={`${styles['test__choice-wrapper']}`}>
                                        <span className={styles["test__choice-alpha"]}>D- </span>One Character Argues With Another Character Who Intrudes On  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Collapse>
            </td>
        </tr>
    </>
  )
}

export default TestResultTableRow