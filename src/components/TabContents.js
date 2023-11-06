import React from 'react';

function TabContents(props) {
  const { showTabIndex } = props;

  let tabContent;
  if (showTabIndex === 0) {
    tabContent = <div>탭 내용 1</div>
  } else if (showTabIndex === 1) {
    tabContent = <div>탭 내용 2</div>
  } else if (showTabIndex === 2) {
    tabContent = <div>탭 내용 3</div>
  } else if (showTabIndex === 3) {
    tabContent = <div>탭 내용 4</div>
  }

  return (
    <>
      {tabContent}
    </>
  );
}

export default TabContents;