import Grid from "@mui/material/Grid";
import React from "react";
import configJson from "vridhee_common_component_mf/configJson";

export default function ProgramBuddy() {
    const assetUrl = configJson.local.assetUrl
    return (
        <div>
            <div className="user-con">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box primary-bg text-white">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAmCAYAAACyAQkgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDNjEzODlCM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDNjEzODlDM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM2MTM4OTkzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2MTM4OUEzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5tFEPNAAADiElEQVR42sRYvXLTQBCWPR6GzqaiA1XQxaaB0lJLE6WitPIEFh0d8vAAMRWl5YoyTkXBMDo/AXKVhpnYb6A8gdhzvsusbs76SSRnZ76xJEu6T9/u7e5dJ8sy27KsiXUcmxF8wuuazy07RNShg5iwbpGgDXIdwpzgEQaEpOAZ+f8QvAJLEs3uzGoRoTaGPBclz+R4dbWv+EX4QXhJyAgfCF8I1y2oLNW6IIwN6stQ/Jq7qjE/IbzB8VvCc8IrwvuGFZXws7zdaOdScVvd32Oc45Zj1GS3BAfxqGy7j8k7VVN1kRNtczJ1DGTl7F8dmFAhYUoYEYRONGyAkIPY1j8+NMSixRUru95rWLnYoOQhE3BvaCAWsDDYW7cFN7tAmc3xIbEWFlPM+FldoiHcqRA29EEpQkXG4Q17/xxxmxunqqIbqLRpUHk5mf4yF7tQUcV6jI+oFaMpYirVkrKyHSGqSVIq1yec4dkJSusVxpmA7Dv5IbqiI8xOhUFBXgyhwjkGrpNTF5gwO5Dz2Tvk9VO8d6dCoGcIcBuuGFeYFA5e5NRUc8M8sACxNYSKUQgiKHspyZtiNKo58ENy7YqNtYO7HeAFm0jqvlHXejpz2CxXbk9YJhBlCX9iqCJDuGSIvvKUJXgbsayS/QV7zmOqHLLEcF5amSKWfNcs4Q5wzvuBK0OPoB9fYtY+2jhR1f9lBnXXiJtPBZmA2z/CH1SZaUH3ZGnjr3WXc6IpbnAL0olS9qzieuc3iFpQNGVqqxqfGSrgjBHtI4xu9+NXbHrFAxvmDI25fn1OSLX/M4zFG+2E4JmWImV2rdV9HdJ+AkUWYKIVmcqrqzoltI/fj4RnJfd+ayOXVSEqEOixof5/14JfMGUH9/F1RKKuoVrZIC+Q1pbIEEtGLjomUUVWHOhVfSgbMnKiadc/toRuQdAG2V1b9bapWp+yzitpZRkrc1SF/nGClDKwjmMpoIpFYYzamO0+XCpJfm5IMR85MmBrpEhr4H2spdz9/wc2p2K2reKwbR+nwU0zVe0Eq0g6VtjqySmq3DtCilGzWrDUNDTU6IdY1f3RAKo6PdbEzvCCCMemzd3zgt2NuntR24pZJZdHBR722FeYNreChnJk1XXWfeevp6cVXuDC/QtUn/ETLFU8tHnSu2lZelLLYg+NSdKg69XW+Ajv3GqzXm2jh1XzqGow/CPmUaGL8l+AAQA6Nf4hUeaG0gAAAABJRU5ErkJggg==" alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box bg-white">
                            <img src={`${assetUrl}/login/Recognization student.svg`} alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box bg-white">
                            <img src={`${assetUrl}/login/Recognization student.svg`} alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box primary-bg text-white">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAmCAYAAACyAQkgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDNjEzODlCM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDNjEzODlDM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM2MTM4OTkzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2MTM4OUEzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5tFEPNAAADiElEQVR42sRYvXLTQBCWPR6GzqaiA1XQxaaB0lJLE6WitPIEFh0d8vAAMRWl5YoyTkXBMDo/AXKVhpnYb6A8gdhzvsusbs76SSRnZ76xJEu6T9/u7e5dJ8sy27KsiXUcmxF8wuuazy07RNShg5iwbpGgDXIdwpzgEQaEpOAZ+f8QvAJLEs3uzGoRoTaGPBclz+R4dbWv+EX4QXhJyAgfCF8I1y2oLNW6IIwN6stQ/Jq7qjE/IbzB8VvCc8IrwvuGFZXws7zdaOdScVvd32Oc45Zj1GS3BAfxqGy7j8k7VVN1kRNtczJ1DGTl7F8dmFAhYUoYEYRONGyAkIPY1j8+NMSixRUru95rWLnYoOQhE3BvaCAWsDDYW7cFN7tAmc3xIbEWFlPM+FldoiHcqRA29EEpQkXG4Q17/xxxmxunqqIbqLRpUHk5mf4yF7tQUcV6jI+oFaMpYirVkrKyHSGqSVIq1yec4dkJSusVxpmA7Dv5IbqiI8xOhUFBXgyhwjkGrpNTF5gwO5Dz2Tvk9VO8d6dCoGcIcBuuGFeYFA5e5NRUc8M8sACxNYSKUQgiKHspyZtiNKo58ENy7YqNtYO7HeAFm0jqvlHXejpz2CxXbk9YJhBlCX9iqCJDuGSIvvKUJXgbsayS/QV7zmOqHLLEcF5amSKWfNcs4Q5wzvuBK0OPoB9fYtY+2jhR1f9lBnXXiJtPBZmA2z/CH1SZaUH3ZGnjr3WXc6IpbnAL0olS9qzieuc3iFpQNGVqqxqfGSrgjBHtI4xu9+NXbHrFAxvmDI25fn1OSLX/M4zFG+2E4JmWImV2rdV9HdJ+AkUWYKIVmcqrqzoltI/fj4RnJfd+ayOXVSEqEOixof5/14JfMGUH9/F1RKKuoVrZIC+Q1pbIEEtGLjomUUVWHOhVfSgbMnKiadc/toRuQdAG2V1b9bapWp+yzitpZRkrc1SF/nGClDKwjmMpoIpFYYzamO0+XCpJfm5IMR85MmBrpEhr4H2spdz9/wc2p2K2reKwbR+nwU0zVe0Eq0g6VtjqySmq3DtCilGzWrDUNDTU6IdY1f3RAKo6PdbEzvCCCMemzd3zgt2NuntR24pZJZdHBR722FeYNreChnJk1XXWfeevp6cVXuDC/QtUn/ETLFU8tHnSu2lZelLLYg+NSdKg69XW+Ajv3GqzXm2jh1XzqGow/CPmUaGL8l+AAQA6Nf4hUeaG0gAAAABJRU5ErkJggg==" alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box primary-bg text-white">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAmCAYAAACyAQkgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDNjEzODlCM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDNjEzODlDM0MyNDExRUVBNDQ3QUU1M0JGNDI3QzczIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUM2MTM4OTkzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUM2MTM4OUEzQzI0MTFFRUE0NDdBRTUzQkY0MjdDNzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5tFEPNAAADiElEQVR42sRYvXLTQBCWPR6GzqaiA1XQxaaB0lJLE6WitPIEFh0d8vAAMRWl5YoyTkXBMDo/AXKVhpnYb6A8gdhzvsusbs76SSRnZ76xJEu6T9/u7e5dJ8sy27KsiXUcmxF8wuuazy07RNShg5iwbpGgDXIdwpzgEQaEpOAZ+f8QvAJLEs3uzGoRoTaGPBclz+R4dbWv+EX4QXhJyAgfCF8I1y2oLNW6IIwN6stQ/Jq7qjE/IbzB8VvCc8IrwvuGFZXws7zdaOdScVvd32Oc45Zj1GS3BAfxqGy7j8k7VVN1kRNtczJ1DGTl7F8dmFAhYUoYEYRONGyAkIPY1j8+NMSixRUru95rWLnYoOQhE3BvaCAWsDDYW7cFN7tAmc3xIbEWFlPM+FldoiHcqRA29EEpQkXG4Q17/xxxmxunqqIbqLRpUHk5mf4yF7tQUcV6jI+oFaMpYirVkrKyHSGqSVIq1yec4dkJSusVxpmA7Dv5IbqiI8xOhUFBXgyhwjkGrpNTF5gwO5Dz2Tvk9VO8d6dCoGcIcBuuGFeYFA5e5NRUc8M8sACxNYSKUQgiKHspyZtiNKo58ENy7YqNtYO7HeAFm0jqvlHXejpz2CxXbk9YJhBlCX9iqCJDuGSIvvKUJXgbsayS/QV7zmOqHLLEcF5amSKWfNcs4Q5wzvuBK0OPoB9fYtY+2jhR1f9lBnXXiJtPBZmA2z/CH1SZaUH3ZGnjr3WXc6IpbnAL0olS9qzieuc3iFpQNGVqqxqfGSrgjBHtI4xu9+NXbHrFAxvmDI25fn1OSLX/M4zFG+2E4JmWImV2rdV9HdJ+AkUWYKIVmcqrqzoltI/fj4RnJfd+ayOXVSEqEOixof5/14JfMGUH9/F1RKKuoVrZIC+Q1pbIEEtGLjomUUVWHOhVfSgbMnKiadc/toRuQdAG2V1b9bapWp+yzitpZRkrc1SF/nGClDKwjmMpoIpFYYzamO0+XCpJfm5IMR85MmBrpEhr4H2spdz9/wc2p2K2reKwbR+nwU0zVe0Eq0g6VtjqySmq3DtCilGzWrDUNDTU6IdY1f3RAKo6PdbEzvCCCMemzd3zgt2NuntR24pZJZdHBR722FeYNreChnJk1XXWfeevp6cVXuDC/QtUn/ETLFU8tHnSu2lZelLLYg+NSdKg69XW+Ajv3GqzXm2jh1XzqGow/CPmUaGL8l+AAQA6Nf4hUeaG0gAAAABJRU5ErkJggg==" alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="user-con-box bg-white">
                            <img src={`${assetUrl}/login/Recognization student.svg`} alt="" />
                            <p className="m-0">Build your own campus with LMS, content, question bank & e-books for free</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}