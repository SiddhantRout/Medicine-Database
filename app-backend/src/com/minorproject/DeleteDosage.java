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
 * Servlet implementation class DeleteDosage
 */
@WebServlet("/DeleteDosage")
public class DeleteDosage extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeleteDosage() {
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
		String dosage = null;
		
		try {
			BufferedReader reader = request.getReader();
			dosage = reader.readLine();
			System.out.println(dosage);
			
			dosage = dosage.substring(1, dosage.length() - 1);
			dosage = dosage.split(":")[1];
			dosage = dosage.substring(1, dosage.length() - 1);
			
			String final_values[] = dosage.split(",");
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "DELETE FROM dosage where dosage_id=?";
			
			for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				System.out.println(final_values[i]);
				PreparedStatement st = conn.prepareStatement(sql_statement);
				st.setString(1,  final_values[i]);
				st.executeUpdate();
			}
			
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
