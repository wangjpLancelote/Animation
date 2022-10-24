const wrapper = document.getElementById("wrapper");

// clientX/clientY读取鼠标坐标

window.onmousemove = e => {
  const mouseX = e.clientX,
        mouseY = e.clientY;
  
    // 文档显示区的宽度与高度
  const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;

  console.log('dev', xDecimal, yDecimal);
  
  const maxX = wrapper.offsetWidth - window.innerWidth,
        maxY = wrapper.offsetHeight - window.innerHeight;

  console.log('max', maxX, maxY);
  
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
  wrapper.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })
}