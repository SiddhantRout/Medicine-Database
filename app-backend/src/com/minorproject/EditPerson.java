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
 * Servlet implementation class EditPerson
 */
@WebServlet("/EditPerson")
public class EditPerson extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditPerson() {
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
		String person = null;
		
		try {
			BufferedReader reader = request.getReader();
			person = reader.readLine();
			System.out.println(person);
			
			person = person.substring(1, person.length() - 1);
			String final_values[] = person.split(",");
			
			for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				if(final_values[i].charAt(0) == '\"')
					final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				System.out.println(final_values[i]);
			}
			
			String person_id = final_values[0];
//			String name = final_values[1];
			String age = final_values[1];
			String medicalHistory = final_values[2];
//			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "UPDATE person SET age=?, notes=? WHERE person_id=?";
			
			PreparedStatement st = conn.prepareStatement(sql_statement);
//			st.setString(1, name);
			st.setString(1,  age);
			st.setString(2,  medicalHistory);
			st.setString(3,  person_id);
//			
			st.executeUpdate();
			conn.close();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
//		catch (SQLException e) {
//			e.printStackTrace();
//		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

}
