package com.minorproject;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AddMedicine
 */
@WebServlet("/AddMedicine")
public class AddMedicine extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddMedicine() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String medicine = null;
		
		try {
			BufferedReader reader = request.getReader();
			medicine = reader.readLine();
			System.out.println(medicine);
			
			medicine = medicine.substring(1, medicine.length() - 1);
			String final_values[] = medicine.split(",");
			
			for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				System.out.println(final_values[i]);
			}
			
			String name = final_values[0];
			String concentration = final_values[1];
			int quantity = Integer.parseInt(final_values[2]);
			String unit = final_values[3];
			String expiry = final_values[4].substring(0, final_values[4].length() - 2);
			String purpose = final_values[5];
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "INSERT INTO medicine (name, concentration, quantity, unit, expiry, purpose) values (?, ?, ?, ?, ?, ?)";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(1, name);
			st.setString(2,  concentration.isEmpty() ? null : concentration);
			st.setInt(3,  quantity);
			st.setString(4,  unit);
			st.setString(5,  expiry);
			st.setString(6,  purpose.isEmpty() ? null : purpose);
			
			st.executeUpdate();
			conn.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
