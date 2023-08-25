import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import Sidebar from './Sidebar';

function App() {
  const [isClockwise, setIsClockwise] = useState(true);
  const [iconSize, setIconSize] = useState(250);
  const [mouseEnterTime, setMouseEnterTime] = useState(null);
  const [mouseInactiveTime, setMouseInactiveTime] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCursorTracking,setShowCursorTracking] = useState()

  // For reversing the rotation direction of react icon
  const handleIconClick = () => {
    setIsClockwise(prevIsClockwise => !prevIsClockwise);
  };

  // For adjusting the react icon based on position of the cursor
  const handleMouseMove_for_size = (e) => {
    const scaleFactor = 1;
    const newSize = Math.max(50, iconSize + e.movementY * scaleFactor);
    setIconSize(newSize);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove_for_size);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove_for_size);
    };
  }, [iconSize]);

  // For calculating the inactive time of cursor in visible page
  const handleMouseMove_inactivetime = () => {
    setMouseEnterTime(new Date());
    setMouseInactiveTime(0);
  };

  const handleMouseLeave_inactivetime = () => {
    setMouseEnterTime(null);
  };

  const updateMouseInactiveTime = () => {
    if (mouseEnterTime) {
      const currentTime = new Date();
      const inactiveTime = currentTime - mouseEnterTime;
      setMouseInactiveTime(inactiveTime);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove_inactivetime);
    window.addEventListener('mouseleave', handleMouseLeave_inactivetime);
    const interval = setInterval(updateMouseInactiveTime,1000);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove_inactivetime);
      window.removeEventListener('mouseleave', handleMouseLeave_inactivetime);
      clearInterval(interval);
    };
  }, [mouseEnterTime]);

  // for sidebar implementation
  const toggleClockwise = () => {
    setIsClockwise(prevIsClockwise => !prevIsClockwise);
  };

  const toggleIconSize = () => {
    setIconSize(prevSize => (prevSize > 250 ? 250 : 400));
  };

  const toggleCursorTracking = () => {
    setShowCursorTracking(prevTracking => !prevTracking);
    setMouseEnterTime(null);
    setMouseInactiveTime(0);
  };

  return (
    <div className="App">
    <div className={`sidebar ${showSidebar ? 'visible' : ''}`}>
        {showSidebar && (
          <Sidebar
            isClockwise={isClockwise}
            toggleClockwise={toggleClockwise}
            iconSize={iconSize}
            toggleIconSize={toggleIconSize}
            cursorTracking={showCursorTracking}
            toggleCursorTracking={toggleCursorTracking}
          />
        )}
      </div>
      <header className={`App-header ${showSidebar ? 'with-sidebar' : ''}`}>
        <img src={logo} className={`App-logo ${isClockwise ? 'clockwise' : 'anticlockwise'}`} alt="logo" style={{ width: iconSize, height: iconSize }} onClick={handleIconClick} />
        <p> Inactive Time of Cursor in Visible Page: {mouseInactiveTime / 1000} seconds</p>
      </header>
    </div>
  );
}

export default App;
