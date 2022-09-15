import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Report from '../Report'

afterEach(() => {
    cleanup();
})

test('check if buttons exists', () => {
    render(<Report />)
    const report = screen.getByTestId('report');
    expect(report).toBeInTheDocument();
})

test('user can switch between reports', () => {
    render(<Report />);

    fireEvent.click(screen.getByTestId('Report 3'));
    const reportText = screen.getByTestId('reporttext');
    expect(reportText).toBeInTheDocument();
    expect(reportText).toHaveTextContent('Report 3')

    fireEvent.click(screen.getByTestId('Report 10'));
    expect(reportText).toBeInTheDocument();
    expect(reportText).toHaveTextContent('Report 10')
})