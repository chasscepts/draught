import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeedback, selectFeedbacks } from '../../reducers/feedbackSlice';
import css from './style.module.css';

const Display = ({ text }) => {
  const isPage = text.indexOf('<!DOCTYPE html>') === 0;

  if (!isPage) return (
    <div className={css.display}>
      {text}
    </div>
  );
  return <div className={css.iframeWrap}>
    <iframe className={css.iframe} srcDoc={text} />
  </div>
};

/**
 * @param {Object} props
 * @param {string} props.msg
 * @param {number} props.id
*/
const Page = ({ text, id }) => {
  const dispatch = useDispatch();

  const close = () => dispatch(removeFeedback(id));

  return (
    <>
      <button type='button' className={css.closeBtn} onClick={close} />
      <Display text={text} />
    </>
  );
}

const Feedback = () => {
  const feedbacks = useSelector(selectFeedbacks);

  if (feedbacks.length <= 0) return <></>;

  return (<div className={css.container}>
    {feedbacks.map((feedback) => <Page key={feedback.id} id={feedback.id} text={feedback.text} />)}
  </div>);
};

export default Feedback;
