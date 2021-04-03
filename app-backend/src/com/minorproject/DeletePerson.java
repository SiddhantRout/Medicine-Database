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
 * Servlet implementation class DeletePerson
 */
@WebServlet("/DeletePerson")
public class DeletePerson extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public DeletePerson() {
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
			person = person.split(":")[1];
			person = person.substring(1, person.length() - 1);
			
			String final_values[] = person.split(",");
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "DELETE FROM person where person_id=?";
			
			for(int i = 0; i < final_values.length; ++i) {
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
