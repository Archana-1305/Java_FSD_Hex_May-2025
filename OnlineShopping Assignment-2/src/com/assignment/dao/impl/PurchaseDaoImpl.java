package com.assignment.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.assignment.dao.PurchaseDao;
import com.assignment.model.Purchase;
import com.assignment.utility.DBUtil;

public class PurchaseDaoImpl implements PurchaseDao {
	
	DBUtil db = DBUtil.getInstance();

	@Override
	public void addPurchase(Purchase purchase) {
		Connection con = db.connect();
		String sql = "Insert Into Purchase (customer_id, product_id, quantity, purchase_date, coupon_used, total_amount) Values (?, ?, ?, ?, ?, ?)";
		try {
			PreparedStatement pst = con.prepareStatement(sql);
			pst.setInt(1, purchase.getCustomer().getCustomerId());
            pst.setInt(2, purchase.getProduct().getProductId());
            pst.setInt(3, purchase.getQuantity());
            pst.setString(4, purchase.getPurchaseDate().toString());
            pst.setString(5, String.valueOf(purchase.getCouponUsed()));
            pst.setDouble(6, purchase.getTotalAmount());
            
            pst.executeUpdate();     
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		db.close();
	}


}
