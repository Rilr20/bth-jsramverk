import {render, screen, cleanup }  from '@testing-library/react'
import ReportText from '../ReportText'

test('should render a report', () => {
    let reportNum = 2;
    render(<ReportText num={reportNum} />)
    const reportText = screen.getByTestId('reporttext');
    expect(reportText).toBeInTheDocument();
    expect(reportText).toHaveTextContent('Report 3')
})