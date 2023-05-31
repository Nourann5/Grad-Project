import React from 'react'
import styles from './TestConfiguration.module.css'

import ToggleButon from 'components/Global/Elements/ToggleButon/ToggleButon'
import { MultiSelect } from 'react-multi-select-component'
import DatePicker, { ReactDatePicker } from "react-datepicker";
import { Controller, useFormContext } from 'react-hook-form';
function TestConfiguration() {
    const { register ,getValues , setValue , control } = useFormContext();
    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry", disabled: true },
    ];

    return (
        <>
            <div className={styles['add-test__configuration-field-cont']}>

                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>Exam Time</label>
                    <ToggleButon
                        name='test_configuration.exam_time.active'
                        checked={getValues('test_configuration.exam_time.active')}
                    />
                </div>
                {
                    getValues('test_configuration.exam_time.active') &&
                        <div className={styles['add-test__configuration-field-input']}>
                            <input 
                            type="number" 
                            min='0' 
                            step='.1' 
                            className='form-control mt-3' 
                            placeholder='please add Exam Time'
                            {...register('test_configuration.exam_time.value')}
                            />
                        </div>
                }
            </div>

            {/* <div className={styles['add-test__configuration-field-cont']}>
                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>ُExam Language</label>
                </div>
                <div className={styles['add-test__configuration-field-input']}>
                    
                    <select
                        className='form-select mt-3'
                        {...register('test_configuration.exam_language')}
                    >
                        <option value='english' selected>English</option>
                        <option value='arabic'>العربية</option>
                    </select>
                </div>
            </div> */}

            <div className={styles['add-test__configuration-field-cont']}>
                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>Exam Available For Who</label>
                </div>
                <div className={styles['add-test__configuration-field-input']}>
                    
                    <select
                        className='form-select mt-3'
                        {...register('test_configuration.exam_available_for_who.value')}
                    >
                        <option value='1' selected>All users in Invo</option>
                        <option value='2'>All users in my groups</option>
                        <option value='3'>Users with specific codes</option>
                        <option value='4'>No one</option>
                    </select>
                    {
                        getValues('test_configuration.exam_available_for_who.value') ==2 &&
                            <Controller 
                                render={({name })=><MultiSelect
                                    className='mt-3'
                                    name={name}
                                    options={options}
                                    value={getValues(`${name}`)||[]}
                                    onChange={(data)=>setValue(`${name}`,data)}  
                                    labelledBy="Select"
                                />}
                                name='test_configuration.exam_available_for_who.groups'
                                control={control}
                            />
                    }

                    {
                        getValues('test_configuration.exam_available_for_who.value') ==3  &&
                        <div className={styles['add-test__configuration-field-input']}>
                            <input 
                            type="number" 
                            min='0' 
                            step='.1' 
                            className='form-control mt-3' 
                            placeholder='Number of generated codes'
                            {...register('test_configuration.exam_available_for_who.no_of_codes')}
                            />
                        </div>
                    }

                </div>
            </div>
            
            <div className={styles['add-test__configuration-field-cont']}>

                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>Exam Available When</label>
                </div>
                <div className={styles['add-test__configuration-field-input']}>
                    
                    <select
                        className='form-select mt-3'
                        {...register('test_configuration.exam_available_for_when.value')}
                    >
                        <option value='1' selected>For Ever</option>
                        <option value='2'>For Specific Time</option>
                    </select>

                    {
                        getValues('test_configuration.exam_available_for_when.value') ==2&&
                        <>
                            <div className='mt-3'>
                                <label>Start date</label>
                                <Controller
                                    render={({name})=><DatePicker
                                        className='form-control mt-23'
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                        minDate={new Date()}
                                        showMonthDropdown
                                        useShortMonthInDropdown
                                        name={name}
                                        selected={ getValues(`test_configuration.exam_available_for_when.start_date`)||new Date()}
                                        onChange={(data)=>setValue(`test_configuration.exam_available_for_when.start_date`,data)}  
                                    />}
                                    control={control}
                                    name='test_configuration.exam_available_for_when.start_date'
                                    />
                            </div>
                            <div className='mt-3'>
                                <label>End date</label>
                                <Controller
                                    render={({name})=><DatePicker
                                        className='form-control mt-23'
                                        timeInputLabel="Time:"
                                        dateFormat="MM/dd/yyyy h:mm aa"
                                        showTimeInput
                                        showMonthDropdown
                                        minDate={getValues(`test_configuration.exam_available_for_when.end_date`)||new Date()}
                                        useShortMonthInDropdown
                                        name={name}
                                        selected={ getValues(`test_configuration.exam_available_for_when.end_date`)||new Date()}
                                        onChange={(data)=>setValue(`test_configuration.exam_available_for_when.end_date`,data)}  
                                    />}
                                    control={control}
                                    name='test_configuration.exam_available_for_when.end_date'
                                    />
                            </div>
                        </>
                }
                </div>
            </div>

            <div className={styles['add-test__configuration-field-cont']}>
                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>Show exam Questions</label>
                </div>
                <div className={styles['add-test__configuration-field-input']}>
                    <select
                        className='form-select mt-3'
                        {...register('test_configuration.show_exam_questions.value')}
                    >
                        <option value='1' selected>In added order</option>
                        <option value='2'>Random for all questions</option>
                        <option value='3'>Random for groups</option>
                        {/* <option value='3'>Never show answer</option> */}
                    </select>
                </div>
            </div>

            <div className={styles['add-test__configuration-field-cont']}>
                <div className={styles['add-test__configuration-label-cont']}>
                    <label className={styles["add-test__config-label"]}>Show exam answers</label>
                </div>
                <div className={styles['add-test__configuration-field-input']}>
                    
                    <select
                        className='form-select mt-3'
                        {...register('test_configuration.show_exam_answers.value')}
                    >
                        <option value='1' selected>After end exam</option>
                        <option value='2'>After answer each question</option>
                        {/* <option value='2'>After end exam after specific date</option> */}
                        <option value='3'>Never show answer</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default TestConfiguration