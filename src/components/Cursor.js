import React, { useEffect, useRef, useState } from 'react';

function Cursor() {
  const cursorDotOutline = useRef();
  const cursorDot = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const cursorVisible = useState(false);
  const cursorEnlarged = useState(false);

  const onMouseMove = (event) => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };

  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);

    handleLinkHovers();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;

  const positionDot = (e) => {
    cursorVisible.current = true;
    toggleCursorVisibility();
    endX = e.pageX;
    endY = e.pageY;
    cursorDot.current.style.top = endY + 'px';
    cursorDot.current.style.left = endX + 'px';
  };

  const toggleCursorVisibility = () => {
    if (cursorVisible.current) {
      cursorDot.current.style.opacity = 1;
      cursorDotOutline.current.style.opacity = 1;
    } else {
      cursorDot.current.style.opacity = 0;
      cursorDotOutline.current.style.opacity = 0;
    }
  };

  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(5)';
    } else {
      cursorDot.current.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDotOutline.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  const handleLinkHovers = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener('mouseout', () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  };

  const animateDotOutline = (time) => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8;
      y += (endY - y) / 8;
      cursorDotOutline.current.style.top = y + 'px';
      cursorDotOutline.current.style.left = x + 'px';
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot" />
    </>
  );
}

export default Cursor;